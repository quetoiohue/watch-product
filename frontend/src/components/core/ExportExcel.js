import React from 'react'
import ReactExport from 'react-export-excel'

const ExcelFile = ReactExport.ExcelFile
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn

const ExportExcel = ({ element, data, name, columns }) => {
  return (
    <div>
      <ExcelFile element={element}>
        <ExcelSheet data={data} name={name}>
          {columns?.map((_col, index) => (
            <ExcelColumn
              key={`col-${index}`}
              label={_col.label}
              value={_col.value}
            />
          ))}
        </ExcelSheet>
      </ExcelFile>
    </div>
  )
}

export default ExportExcel
