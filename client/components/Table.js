import React, { useEffect, useMemo, useState } from "react";
import { useGlobalFilter, useSortBy, useTable } from "react-table";
import { COLUMNS } from './Columns';
import GlobalFilter from './GlobalFilter';
import './table.css';


export const Table = () => {

    const columns = useMemo(() => COLUMNS, []);
    const [data, setData] = useState([]);
    const memoData = useMemo(() => data, [data]);

    const fetchData = async () => {
        const response = await fetch("/api/measurements");
        const json = await response.json(); 
        setData(json);
     }
    
   useEffect(() => {fetchData()}, [])

    const tableInstance = useTable({
        columns: columns,
        data: memoData
        
    },
    useGlobalFilter,
    useSortBy)

    

    const { getTableProps,
            getTableBodyProps,
            headerGroups,
            rows,
            prepareRow,
            state,
            setGlobalFilter} = tableInstance

            const {globalFilter} = state

    return (
        <>
     <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
        <table {...getTableProps()}>
            <thead>
            {
                headerGroups.map((headerGroup)=>(
                    <tr {...headerGroup.getHeaderGroupProps()}>
                    {
                        headerGroup.headers.map((column) =>(
                            <th {...column.getHeaderProps(column.getSortByToggleProps())}>{column.render('Header')} 
                            <span>
                                {column.isSorted ? (column.isSortedDesc ? '▼' : '▲'): ''}
                            </span>
                            </th>
                        ))
                    }           
                    </tr>
                ))
            }

            </thead>
            
            <tbody {...getTableBodyProps()}>
             {
                 rows.map(row =>{
                     prepareRow(row)
                     return (
                         <tr {...row.getRowProps()}>
                         {
                             row.cells.map((cell) =>{
                                 return <td {...cell.getCellProps()} > {cell.render('Cell')} </td>
                             })
                         }
                         </tr>
                     )
                 })
             }
      
             </tbody>
         </table>
         </>
    )
}
