import React, {useEffect, useState, useRef} from 'react';
import {TableContainer, Paper, Table, TableCell, TableHead, TableRow, TableBody} from "@mui/material";
import './dataTable.css'
import  * as XLSX  from 'xlsx'
import {useReactToPrint} from 'react-to-print'
import Button from "@mui/material/Button";



const DataTable = () => {
    const componentRef = useRef()
    const [item, setItem] = useState([])
    const [arr, setArr] = useState([])

    const fetchData = async () => {
        try{
            const response = await fetch('https://jsonplaceholder.typicode.com/users?_limit=5')
            const data = await response.json()
            setItem(data)
        }catch (e) {
            alert(e.message)
        }

    }

    useEffect(() => {
        fetchData()
    }, [])

    const handleSaveXlsx = () => {

        item.map(i =>

            arr.push({name: i.name, price: i.address.zipcode, data: i.id, status: i.username})
        )

        let wb = XLSX.utils.book_new(),
           ws = XLSX.utils.json_to_sheet(arr)
        ws["!cols"] = [{width: 25}]
        XLSX.utils.book_append_sheet(wb, ws, 'data-table')

        XLSX.writeFile(wb, 'MyFile.xlsx')
    }

    const handleSavePDF = useReactToPrint({
        content: () => componentRef.current,
        documentTitle: 'data-table',
        onAfterPrint: () => console.log('success')
    })


    return (
        <>
            <div ref={componentRef}>
                <h1 className='title'>Отчет</h1>
                <div>
                    <h3 className='subtitle'>Профессия Управления персоналом 2.0</h3>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>ФИО</TableCell>
                                    <TableCell align="right">Стоимость, руб</TableCell>
                                    <TableCell align="right">Дата заявки</TableCell>
                                    <TableCell align="right">Статус</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {item?.map((row) => (
                                    <TableRow
                                        key={row.name}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">
                                            {row.name}
                                        </TableCell>
                                        <TableCell align="right">{row.address.zipcode}</TableCell>
                                        <TableCell align="right">{row.id}</TableCell>
                                        <TableCell align="right">{row.username}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </div>
           <div style={{marginLeft: 40, marginTop: 20}}>
               <Button onClick={handleSavePDF} variant="outlined" href="#outlined-buttons">
                   PDF
               </Button>
               <Button onClick={handleSaveXlsx} variant="outlined" href="#outlined-buttons">
                   XLSX
               </Button>
           </div>
        </>

    );
};

export default DataTable;