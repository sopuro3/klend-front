import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Issue, FormResponse } from "@/API/API_interface";
import {
    Button,
    Checkbox,
    FormControlLabel,
    InputLabel,
    Link,
    MenuItem,
    Select,
    SelectChangeEvent,
    TextField,
    Typography,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import React, { Suspense, useState } from "react";
import Loader from "../Loader";
import { sleepWithValue } from "@/dashboard/utils/dev/sleepWithValue";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useTheme } from "@mui/material/styles";
const responseItem: FormResponse = {
    issue: [
        {
            adress: "福岡県久留米市小森野1丁目1-1",
            name: "久留米 太郎",
            id: "123e4567-e89b-12d3-a456-426614174001",
            displayId: "0001",
            status: "ニーズ依頼調査",
            note: "なし",
        },
        {
            adress: "福岡県久留米市城南町１５−３",
            name: "筑後 次郎",
            id: "234e5678-e89b-12d3-a456-426614174002",
            displayId: "0002",
            status: "貸し出し中",
            note: "なし",
        },
        // Add more issues as needed
    ],
};

type IssueTableProps = {
    selectBtn?: boolean;
    setValue?: (issue: Issue) => void;
};

export default function IssueTable(props: IssueTableProps) {
    const { selectBtn, setValue } = props;
    return (
        <Suspense fallback={<Loader />}>
            <Table_ selectBtn={selectBtn} setValue={setValue} />
        </Suspense>
    );
}

function Table_(props: IssueTableProps) {
    const { selectBtn, setValue } = props;
    const theme = useTheme();

    const response = useSuspenseQuery({
        queryKey: ["issueTable"],
        queryFn: () => sleepWithValue(10, responseItem),
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
    const [filterByStatus, setStatus] = useState("全て");
    const [searchWord, setSearchWord] = useState("");
    const [searchById, setId] = useState(true);
    const statusHandleChange = (event: SelectChangeEvent | string) => {
        //stringなら
        if (typeof event === "string") {
            setStatus(event);
        } else {
            setStatus(event.target.value);
        }
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
    const tmprow = rows.filter(searchWordFilter);

    function searchWordFilter(issue: Issue) {
        if (
            filterByStatus !== "全て" &&
            !issue.status.includes(filterByStatus)
        ) {
            return false;
        }

        if (searchByAddress && issue.adress.includes(searchWord)) {
            return true;
        }
        if (searchByname && issue.name.includes(searchWord)) {
            return true;
        }
        if (searchBynote && issue.note.includes(searchWord)) {
            return true;
        }
        if (searchById && issue.displayId.includes(searchWord)) {
            return true;
        }

        return false;
    }

    return (
        <>
            <SearchWindow
                setAddress={setAddress}
                setName={setName}
                setNote={setNote}
                setSearch={search}
                setStatus={statusHandleChange}
                Status={filterByStatus}
                SearchWord={searchWord}
                setID={setId}
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
                            <TableCell align="left" sx={{ width: "180px" }}>
                                被災者の代表者名
                            </TableCell>
                            <TableCell align="left">住所</TableCell>

                            <TableCell align="left" sx={{ width: "180px" }}>
                                現在の状態
                            </TableCell>
                            <TableCell align="left">概要</TableCell>
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
                                    {issue.status}
                                </TableCell>
                                <TableCell align="left">{issue.note}</TableCell>
                                <TableCell align="left">
                                    <Link
                                        component={RouterLink}
                                        underline="hover"
                                        to={"/issue/" + issue.id}
                                        key={"/issue/" + issue.id}
                                    >
                                        詳細情報
                                    </Link>
                                </TableCell>
                                {selectBtn && (
                                    <TableCell
                                        align="left"
                                        sx={{ width: "100px" }}
                                    >
                                        <Button
                                            variant="contained"
                                            sx={{
                                                backgroundColor:
                                                    theme.palette.secondary
                                                        .dark,
                                                color: theme.palette.secondary
                                                    .light,
                                            }}
                                            onClick={handleChange(issue)}
                                        >
                                            選択
                                        </Button>
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

type SearchWindowProps = {
    setID: React.Dispatch<React.SetStateAction<boolean>>;
    setAddress: React.Dispatch<React.SetStateAction<boolean>>;
    setName: React.Dispatch<React.SetStateAction<boolean>>;
    setNote: React.Dispatch<React.SetStateAction<boolean>>;
    setStatus: (event: SelectChangeEvent | string) => void;
    Status: string;
    //Searchだけは関数
    setSearch: (searchWord: string) => void;
    SearchWord: string;
    // searchRequest: () => void;
};
function SearchWindow(props: SearchWindowProps) {
    return (
        <>
            <h3>案件の絞り込み</h3>
            <TableContainer component={Paper} elevation={3}>
                <Table size="small" aria-label="a dense table">
                    <TableBody>
                        <TableRow>
                            <TableCell align="left" sx={{ flexGrow: "1" }}>
                                <TextField
                                    sx={{ width: "100%" }}
                                    value={props.SearchWord}
                                    label="例: 城南町"
                                    onChange={(e) =>
                                        props.setSearch(e.target.value)
                                    }
                                ></TextField>
                                <div
                                    style={{
                                        display: "flex",
                                        flexWrap: "wrap",
                                    }}
                                >
                                    <div
                                        style={{
                                            flexGrow: "1",
                                            display: "flex",
                                            flexWrap: "wrap",
                                            justifyContent: "space-between",
                                            paddingRight: "5px",
                                        }}
                                    >
                                        <div>
                                            <Typography>
                                                次の項目から検索:
                                            </Typography>
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        defaultChecked
                                                        onChange={() =>
                                                            props.setID(
                                                                !props.setID,
                                                            )
                                                        }
                                                    />
                                                }
                                                label="受付ID"
                                            />
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        defaultChecked
                                                        onChange={() =>
                                                            props.setAddress(
                                                                !props.setAddress,
                                                            )
                                                        }
                                                    />
                                                }
                                                label="住所"
                                            />
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        defaultChecked
                                                        onChange={() =>
                                                            props.setName(
                                                                !props.setName,
                                                            )
                                                        }
                                                    />
                                                }
                                                label="名前"
                                            />
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        defaultChecked
                                                        onChange={() =>
                                                            props.setNote(
                                                                !props.setNote,
                                                            )
                                                        }
                                                    />
                                                }
                                                label="概要"
                                            />
                                        </div>
                                        <div>
                                            <InputLabel id="demo-simple-select-label">
                                                検索対象
                                            </InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={props.Status}
                                                onChange={props.setStatus}
                                            >
                                                <MenuItem value={"全て"}>
                                                    全て
                                                </MenuItem>
                                                <MenuItem
                                                    value={"ニーズ依頼調査"}
                                                >
                                                    ニーズ依頼調査
                                                </MenuItem>
                                                <MenuItem value={"貸し出し中"}>
                                                    貸し出し中
                                                </MenuItem>
                                            </Select>
                                        </div>
                                    </div>

                                    <div
                                        style={{
                                            //上下中央寄せ
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                        }}
                                    >
                                        <Button
                                            sx={{
                                                marginRight: "auto",
                                            }}
                                            onClick={() => {
                                                props.setAddress(true);
                                                props.setName(true);
                                                props.setNote(true);
                                                props.setStatus("全て");
                                                props.setSearch("");
                                            }}
                                            variant="contained"
                                        >
                                            リセット
                                        </Button>
                                    </div>
                                </div>
                            </TableCell>
                            {/* 
                            <TableCell align="left" sx={{ width: "70px" }}>
                                <Button
                                    sx={{
                                        marginRight: "auto",
                                    }}
                                >
                                    検索
                                </Button>
                            </TableCell> */}
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
            <br />
        </>
    );
}
