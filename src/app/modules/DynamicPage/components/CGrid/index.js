import React, {useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import {TablePagination, TableBody, TableCell, TableRow, TableHead, Table, Paper, Button} from "@material-ui/core";
import {CButton} from "../CButton";
import Toolbar from "@material-ui/core/Toolbar";
import Tooltip from "@material-ui/core/Tooltip";

const useStyles = makeStyles(theme => ({
    tableContainer: {
        width: '100%',
        overflowX: 'auto',
    },
    customTable: {
        minWidth: 650,
    },

    spacer: {
        flex: '1 1 100%',
    },
    actions: {
        color: theme.palette.text.secondary,
    },
}));

export function CGrid({config, context}) {
    const classes = useStyles();
    const {id: gridId, data, export_url: exportUrl, view: {columns, noData, pager, controls = [], keyField}} = config;

    const [page, setPage] = useState(0);

    function handleChangePage(event, newPage, rowsPerPage) {
        setPage(newPage)
    }

    function handleChangeRowsPerPage(event) {
        console.log('handleChangeRowsPerPage', +event.target.value)
    }

    return (
        <>
            <Paper className='mt-5'>
                {exportUrl != null &&
                <Toolbar>
                    <div className={classes.spacer}/>
                    <div className={classes.actions}>
                        <Tooltip title="Export to Excel">
                            <Button onClick={(e) => {
                                e.preventDefault();
                                window.open(exportUrl, '_blank');
                            }} variant='contained' color='primary' className='text-white'><i
                                className='fa fa-file-excel text-white'/>&nbsp;&nbsp;Excel</Button>
                        </Tooltip>
                    </div>
                </Toolbar>
                }
                {data !== undefined && data.length > 0 && pager !== undefined && pager !== null &&
                <TablePagination
                    rowsPerPageOptions={[pager.pageSize || 30]}
                    component="div"
                    count={data.length}
                    rowsPerPage={pager.pageSize || 30}
                    page={page}
                    backIconButtonProps={{
                        'aria-label': 'Previous Page',
                    }}
                    nextIconButtonProps={{
                        'aria-label': 'Next Page',
                    }}
                    onChangePage={(e, n) => handleChangePage(e, n, pager.pageSize || 30)}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />}
                <div className={classes.tableContainer}>
                    <Table className={classes.customTable}>
                        <TableHead>
                            <TableRow>
                                {columns.map(column => <TableCell align='left'
                                                                  key={column['field']}>{column.caption}</TableCell>)}
                                {controls.length > 0 &&
                                <TableCell align='center' key='grid-controls'>Actions</TableCell>}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {(data === undefined || data.length === 0) &&
                            <TableRow><TableCell
                                colSpan={columns.length + (controls.length > 0 ? 1 : 0)}>{noData}</TableCell></TableRow>}
                            {data !== undefined && data.length > 0 && data.slice(page * (pager?.pageSize || 30), page * (pager?.pageSize || 30) + (pager?.pageSize || 30)).map(row => {
                                const rowStyle = {}
                                if (row.color !== undefined) {
                                    rowStyle.background = row.color;
                                }
                                return <TableRow key={row.id} style={rowStyle}>
                                    {columns.map(column => <TableCell
                                        key={`data-${column.field}-${row.id}`}>
                                        {column.type === 'BOOLEAN' && row[column.field] === true &&
                                        <i className='flaticon2-check-mark text-primary'/>}
                                        {column.type === 'BOOLEAN' && row[column.field] === false &&
                                        <i className='flaticon2-cross text-danger'/>}
                                        <span>{row[column.field] || ''}</span>
                                    </TableCell>)}
                                    {controls.length > 0 && <TableCell>{controls.map((config) => {
                                        const requestValues = {};
                                        requestValues[gridId] = {activeRecordId: row[keyField]};

                                        return <CButton
                                            key={`grid-control-${row.id}-${config.id}`}
                                            context={context}
                                            config={config}
                                            values={requestValues}
                                        />
                                    })}</TableCell>}
                                </TableRow>
                            })}
                            {/*{rows.map(row => (
                            <TableRow key={row.name}>
                                <TableCell component="th" scope="row">
                                    {row.name}
                                </TableCell>
                                <TableCell align="right">{row.calories}</TableCell>
                                <TableCell align="right">{row.fat}</TableCell>
                                <TableCell align="right">{row.carbs}</TableCell>
                                <TableCell align="right">{row.protein}</TableCell>
                            </TableRow>
                        ))}*/}
                        </TableBody>
                    </Table>
                </div>
                {data !== undefined && data.length > 0 && pager !== undefined && pager !== null &&
                <TablePagination
                    rowsPerPageOptions={[pager.pageSize || 30]}
                    component="div"
                    count={data.length}
                    rowsPerPage={pager.pageSize || 30}
                    page={page}
                    backIconButtonProps={{
                        'aria-label': 'Previous Page',
                    }}
                    nextIconButtonProps={{
                        'aria-label': 'Next Page',
                    }}
                    onChangePage={(e, n) => handleChangePage(e, n, pager.pageSize || 30)}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />}
            </Paper>
            {/*<div className="mt-20"></div>
            <pre dangerouslySetInnerHTML={{__html: formatHighlight(config)}}/>*/}
        </>
    )
}