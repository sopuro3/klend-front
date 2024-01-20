import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
    Button,
    Card,
    Checkbox,
    FormControl,
    FormControlLabel,
    InputLabel,
    ListItemText,
    MenuItem,
    OutlinedInput,
    Select,
    TextField,
    Typography,
} from "@mui/material";
import React from "react";
import { statusMsg } from "./IssueTable";

const MenuProps = {
    PaperProps: {
        style: {
            width: 250,
        },
    },
};
type SearchWindowProps = {
    setID: React.Dispatch<React.SetStateAction<boolean>>;
    ID: boolean;
    setAddress: React.Dispatch<React.SetStateAction<boolean>>;
    Address: boolean;
    setName: React.Dispatch<React.SetStateAction<boolean>>;
    Name: boolean;
    setNote: React.Dispatch<React.SetStateAction<boolean>>;
    Note: boolean;
    setStatus: (event: string[]) => void;
    // setStatus: (event: SelectChangeEvent | string[]) => void;
    //
    Status: string[];
    //Searchだけは関数
    setSearch: (searchWord: string) => void;
    SearchWord: string;
};
export function SearchWindow(props: SearchWindowProps) {
    return (
        <>
            <Card
                component={Paper}
                elevation={3}
                sx={{
                    padding: "10px",
                }}
            >
                <Typography variant="h4" align="left">
                    案件を絞り込む
                </Typography>
                <TableContainer>
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
                                            <div style={{ paddingTop: "10px" }}>
                                                <Typography>
                                                    次の項目から検索:
                                                </Typography>
                                                <FormControlLabel
                                                    control={
                                                        <Checkbox
                                                            checked={props.ID}
                                                            onChange={() => {
                                                                if (props.ID) {
                                                                    props.setID(
                                                                        false,
                                                                    );
                                                                } else {
                                                                    props.setID(
                                                                        true,
                                                                    );
                                                                }
                                                            }}
                                                        />
                                                    }
                                                    label="受付ID"
                                                />
                                                <FormControlLabel
                                                    control={
                                                        <Checkbox
                                                            checked={
                                                                props.Address
                                                            }
                                                            onChange={() => {
                                                                if (
                                                                    props.Address
                                                                ) {
                                                                    props.setAddress(
                                                                        false,
                                                                    );
                                                                } else {
                                                                    props.setAddress(
                                                                        true,
                                                                    );
                                                                }
                                                            }}
                                                        />
                                                    }
                                                    label="住所"
                                                />
                                                <FormControlLabel
                                                    control={
                                                        <Checkbox
                                                            checked={props.Name}
                                                            onChange={() => {
                                                                if (
                                                                    props.Name
                                                                ) {
                                                                    props.setName(
                                                                        false,
                                                                    );
                                                                } else {
                                                                    props.setName(
                                                                        true,
                                                                    );
                                                                }
                                                            }}
                                                        />
                                                    }
                                                    label="名前"
                                                />
                                                <FormControlLabel
                                                    control={
                                                        <Checkbox
                                                            checked={props.Note}
                                                            onChange={() => {
                                                                if (
                                                                    props.Note
                                                                ) {
                                                                    props.setNote(
                                                                        false,
                                                                    );
                                                                } else {
                                                                    props.setNote(
                                                                        true,
                                                                    );
                                                                }
                                                            }}
                                                        />
                                                    }
                                                    label="概要"
                                                />
                                            </div>
                                            <div>
                                                {/* <FormControl
                sx={{
                    m: 1,
                    minWidth: 120,
                    marginTop: "10px",
                }}
                size="small"
            >
                <InputLabel id="demo-simple-select-label">
                    検索対象
                </InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={props.Status}
                    onChange={
                        props.setStatus
                    }
                >
                    <MenuItem value={"all"}>
                        全て
                    </MenuItem>
                    <MenuItem
                        value={"survey"}
                    >
                        ニーズ依頼調査
                    </MenuItem>
                    <MenuItem
                        value={"check"}
                    >
                        貸し出し中
                    </MenuItem>
                </Select>
            </FormControl> */}
                                                <FormControl
                                                    sx={{ m: 1, width: 300 }}
                                                >
                                                    <InputLabel id="demo-multiple-checkbox-label">
                                                        状態ごとに絞り込む
                                                    </InputLabel>
                                                    <Select
                                                        labelId="demo-multiple-checkbox-label"
                                                        id="demo-multiple-checkbox"
                                                        multiple
                                                        value={props.Status}
                                                        onChange={(event) => {
                                                            console.log(
                                                                event!.target!
                                                                    .value,
                                                                "event",
                                                            );
                                                            props.setStatus(
                                                                event!.target!
                                                                    .value as string[],
                                                            );
                                                        }}
                                                        input={
                                                            <OutlinedInput label="状態ごとに絞り込む" />
                                                        }
                                                        renderValue={(
                                                            selected,
                                                        ) =>
                                                            selected.join(", ")
                                                        }
                                                        MenuProps={MenuProps}
                                                    >
                                                        {statusMsg.map(
                                                            (name) => (
                                                                <MenuItem
                                                                    key={
                                                                        name.key
                                                                    }
                                                                    value={
                                                                        name.text
                                                                    }
                                                                >
                                                                    <Checkbox
                                                                        checked={
                                                                            props.Status.indexOf(
                                                                                name.text,
                                                                            ) >
                                                                                -1 ||
                                                                            props.Status.indexOf(
                                                                                "全て",
                                                                            ) >
                                                                                -1
                                                                        }
                                                                    />
                                                                    <ListItemText
                                                                        primary={
                                                                            name.text
                                                                        }
                                                                    />
                                                                </MenuItem>
                                                            ),
                                                        )}
                                                    </Select>
                                                </FormControl>
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
                                                    props.setID(true);
                                                    // props.setStatus("全て");
                                                    props.setSearch("");
                                                    props.setStatus(
                                                        statusMsg.map(
                                                            (item) => {
                                                                return item.text;
                                                            },
                                                        ),
                                                    );
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
            </Card>
            <br />
        </>
    );
}
