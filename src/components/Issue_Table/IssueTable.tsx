import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Issue } from "@/API/API_interface";
import { Button, Link, Tooltip } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import React, { Suspense, useState } from "react";
import Loader from "../Loader";
import { useSuspenseQuery } from "@tanstack/react-query";
import Fuse from "fuse.js";
import { useTheme } from "@mui/material/styles";
import { encode, tokenize } from "@/Search/encodeAndTokenize";
import { SearchWindow } from "./SearchWindow";
import { fetchIssueList } from "@/API/fetch";
import { ErrorBoundary } from "react-error-boundary";

// const responseItem: FormResponse = {
//     issue: [
//         {
//             adress: "福岡県久留米市小森野1丁目1-1",
//             name: "久留米 太郎",
//             issueId: "123e4567-e89b-12d3-a456-426614174001",
//             displayId: "0001",
//             status: "survey",
//             note: "なし",
//         },
//         {
//             adress: "福岡県久留米市城南町１５−３",
//             name: "筑後 次郎",
//             issueId: "234e5678-e89b-12d3-a456-426614174002",
//             displayId: "0002",
//             status: "confirm",
//             note: "なし",
//         },
//         {
//             adress: "福岡県久留米市東櫛原町999-1",
//             name: "宝満 三郎",
//             issueId: "32e0567-e89b-12d3-a456-426614174001",
//             displayId: "0003",
//             status: "check",
//             note: "被害甚大、複数日の支援を要する可能性",
//         },
//         {
//             adress: "〒830-0002 福岡県久留米市高野１丁目２−１",
//             name: "くるっぱ",
//             issueId: "23235678-e89b-12d3-a456-426614174002",
//             displayId: "0004",
//             status: "return",
//             note: "なし",
//         },
//         // Add more issues as needed
//     ],
// };

type IssueTableProps = {
    selectBtn?: boolean;
    setValue?: (issue: Issue) => void;
};
export const statusMsg = [
    {
        key: "survey",
        text: "ニーズ依頼調査",
    },
    {
        key: "check",
        text: "貸出数確定待ち",
    },
    {
        key: "confirm",
        text: "貸し出し中",
    },
    {
        key: "return",
        text: "未返却機材あり",
    },
    {
        key: "finish",
        text: "返却完了",
    },
];
export default function IssueTable(props: IssueTableProps) {
    const { selectBtn, setValue } = props;
    return (
        <ErrorBoundary fallback={<Loader />}>
            <Suspense fallback={<Loader />}>
                <Table_ selectBtn={selectBtn} setValue={setValue} />
            </Suspense>
        </ErrorBoundary>
    );
}

function Table_(props: IssueTableProps) {
    const { selectBtn, setValue } = props;
    const theme = useTheme();

    const response = useSuspenseQuery({
        queryKey: ["issueTable"],
        queryFn: () => fetchIssueList(),
    });

    const rows = response.data.issue;
    function handleChange(issue: Issue) {
        return function () {
            setValue && setValue(issue);
        };
    }
    //address,name,noteの3つのUseStateを作成
    const [searchByAddress, setAddress] = useState(true);
    const [searchByname, setName] = useState(true);
    const [searchBynote, setNote] = useState(true);
    const [searchWord, setSearchWord] = useState("");
    const [filterByStatusArray, setArrayStatus] = React.useState<string[]>([
        "全て",
    ]);
    const [searchById, setId] = useState(true);
    const statusHandleChange = (event: string[]) => {
        if (event.indexOf("全て") > -1 && event.length > 1) {
            event.splice(event.indexOf("全て"), 1);
            //statusMsgから、eventに含まれていないものを抽出
            const tmp = statusMsg.filter((item) => {
                return event.indexOf(item.text) === -1;
            });
            setArrayStatus(tmp.map((item) => item.text));
            return;
        }
        //statusMsgから、eventに含まれていないものを抽出
        const tmp = statusMsg.filter((item) => {
            return event.indexOf(item.text) === -1;
        });
        //tmpの大きさが0なら、全てが選択されている
        if (tmp.length === 0) {
            setArrayStatus(["全て"]);
            return;
        }

        setArrayStatus(event);
    };

    // console.log(`
    // searchByAddress: ${searchByAddress}
    // searchByname: ${searchByname}
    // searchBynote: ${searchBynote}
    // searchWord: ${searchWord}
    // filterByStatus: ${filterByStatus}
    // `);

    function search(searchWord: string) {
        setSearchWord(searchWord);
    }

    //eslint-disable-next-line  @typescript-eslint/no-array-constructor
    const docs = new Array();
    rows.forEach((row) => {
        //eslint-disable-next-line @typescript-eslint/no-explicit-any
        const _row: any = new Object();
        Object.keys(row).forEach((key: string) => {
            //@ts-expect-error これでいいのか？
            _row[key] = row[key];
            //@ts-expect-error これでいいのか？
            _row[`search_${key}`] = encode(row[key]);
            //@ts-expect-error これでいいのか？
            _row[`tokenized_${key}`] = tokenize(row[key]);
        });
        docs.push(_row);
    });

    // const docs = rows.map((row) => {
    //     Object.fromEntries(
    //         Object.entries(row).flatMap(([key, value]) => [
    //             [key, value],
    //             [`search_${key}`, encode(value)],
    //             [`tokenized_${key}`, tokenize(value)],
    //         ]),
    //     );
    // }) as unknown as Issue[]; //TODO: ここで型が壊れている
    // console.log(docs);
    const fuse = new Fuse(docs, {
        includeScore: true,
        useExtendedSearch: true,
        keys: [
            searchByAddress ? "adress" : "",
            searchByname ? "name" : "",
            searchBynote ? "note" : "",
            searchById ? "displayId" : "",
        ],
    });
    // console.log(fuse);
    // const tmprow = rows.filter(searchWordFilter);
    let tmprow = fuse
        .search(searchWord)
        .map((item) => item.item)
        .filter((item) => {
            // if (filterByStatus === "全て") {
            //     return true;
            // } else {
            //     console.log(item.status);
            //     return item.status === filterByStatus;
            // }

            if (filterByStatusArray.indexOf("全て") > -1) {
                return true;
            }
            return filterByStatusArray.indexOf(item.status) > -1;
        });

    //ディープコピーする
    let filterByStatusArray_convert = filterByStatusArray.concat();
    //全てが選択されている時は、全ての案件を表示する
    if (filterByStatusArray.indexOf("全て") != -1) {
        //削除
        filterByStatusArray_convert.splice(
            filterByStatusArray.indexOf("全て"),
            1,
        );
    }
    const tmp = filterByStatusArray.map((item) => {
        for (let i = 0; i < statusMsg.length; i++) {
            if (statusMsg[i].text === item) {
                return statusMsg[i].key;
            }
        }
    });
    filterByStatusArray_convert = tmp.filter((item) => {
        return item != undefined;
    }) as string[];

    // console.log(tmprow);
    //条件が初期状態で、tmprowが空の時は、全ての案件を表示する
    if (searchWord === "" && filterByStatusArray.includes("全て")) {
        tmprow = rows;
    } else if (searchWord === "") {
        tmprow = rows.filter((item) => {
            if (filterByStatusArray.includes("全て")) {
                return true;
            } else {
                if (filterByStatusArray_convert.includes(item.status)) {
                    return true;
                } else {
                    return false;
                }
            }
        });
    }

    return (
        <>
            <SearchWindow
                setAddress={setAddress}
                Address={searchByAddress}
                setName={setName}
                Name={searchByname}
                setNote={setNote}
                Note={searchBynote}
                setSearch={search}
                setStatus={statusHandleChange}
                Status={filterByStatusArray}
                SearchWord={searchWord}
                setID={setId}
                ID={searchById}
            />
            <TableContainer component={Paper} elevation={3}>
                <Table
                    sx={{ minWidth: 650 }}
                    size="small"
                    aria-label="a dense table"
                >
                    <TableHead>
                        <TableRow>
                            <TableCell align="left" sx={{ width: "80px" }}>
                                受付ID
                            </TableCell>
                            <TableCell align="left" sx={{ minWidth: "130px" }}>
                                被災者の代表者名
                            </TableCell>
                            <TableCell align="left" sx={{ minWidth: "150px" }}>
                                住所
                            </TableCell>

                            <TableCell align="left" sx={{ minWidth: "130px" }}>
                                現在の状態
                            </TableCell>
                            <TableCell align="left" sx={{ minWidth: "150px" }}>
                                概要
                            </TableCell>
                            <TableCell
                                align="left"
                                sx={{ width: "100px" }}
                            ></TableCell>
                            {selectBtn && (
                                <TableCell
                                    align="left"
                                    sx={{ width: "100px" }}
                                ></TableCell>
                            )}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tmprow.map((issue: Issue) => (
                            <TableRow
                                key={issue.name}
                                sx={{
                                    "&:last-child td, &:last-child th": {
                                        border: 0,
                                    },
                                }}
                            >
                                <TableCell component="th" align="right">
                                    {issue.displayId}
                                </TableCell>
                                <TableCell scope="row">{issue.name}</TableCell>
                                <TableCell align="left">
                                    {issue.adress}
                                </TableCell>
                                <TableCell align="left">
                                    {statusMsg.map((item) => {
                                        if (item.key === issue.status) {
                                            return item.text;
                                        }
                                    })}
                                </TableCell>
                                <TableCell align="left">{issue.note}</TableCell>
                                <TableCell align="left">
                                    <Link
                                        component={RouterLink}
                                        underline="hover"
                                        to={"/issue/" + issue.issueId}
                                        key={"/issue/" + issue.issueId}
                                    >
                                        詳細情報
                                    </Link>
                                </TableCell>
                                {selectBtn && (
                                    <TableCell
                                        align="left"
                                        sx={{ width: "100px" }}
                                    >
                                        <Tooltip
                                            title={
                                                !(
                                                    issue.status === "survey" ||
                                                    issue.status === "check"
                                                )
                                                    ? "この案件は既に貸出数確定が行われているので、選択できません。"
                                                    : ""
                                            }
                                        >
                                            <span>
                                                <Button
                                                    variant="contained"
                                                    sx={{
                                                        backgroundColor:
                                                            theme.palette
                                                                .secondary.dark,
                                                        color: theme.palette
                                                            .secondary.light,
                                                    }}
                                                    disabled={
                                                        !(
                                                            issue.status ===
                                                                "survey" ||
                                                            issue.status ===
                                                                "check"
                                                        )
                                                    }
                                                    onClick={handleChange(
                                                        issue,
                                                    )}
                                                >
                                                    選択
                                                </Button>
                                            </span>
                                        </Tooltip>
                                    </TableCell>
                                )}
                            </TableRow>
                        ))}

                        {tmprow.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={6} align="center">
                                    お探しの案件は見つかりませんでした。検索条件を変更し、もう一度お試しください。
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}
