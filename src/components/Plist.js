//import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css'; // Core grid CSS
import 'ag-grid-community/styles/ag-theme-alpine.css'; // Optional theme CSS
import "./PList.css";  // Update to match the actual file name
import React, { useRef, useState, useCallback, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
//import { CheckboxSelectionComponent } from 'ag-grid-community';
import 'ag-grid-enterprise';

import { AgGridReact } from "ag-grid-react";
import "ag-grid-charts-enterprise";





function Plist() {
    const [datas, setDatas] = useState([]);
    const [filteredData, setFilteredDatas] = useState([]);
    const [error, setError] = useState(null);
    const { EventID } = useParams();
    const navigate =useNavigate();

    // Ref'ler ile gridRef ve columnApi'yi saklıyoruz
    const gridRef = useRef();
    const columnApi = useRef();

    const getBoolean = (id) => {
        return !!document.querySelector("#" + id).checked;
    };

    const getParams = () => {
        return {
            allColumns: getBoolean("allColumns"),
        };
    };

    const transformData = (datas) => {
        return datas.map(user => ({
            cardID: user.cardID,
            fullName: user.fullName,
            dateOfBirth: user.dateOfBirth,
            mailAddress: user.mailAddress,
            userRegistrationID: user.userRegistrationID,
            hireDate: user.hireDate,
            phoneNumber: user.phoneNumber,
            gender: user.user_Gender?.name || 'Unknown',
            workingMethod: user.main_Characteristicts?.workingMethod || 'Unknown',
            isOfficeEmployee: user.main_Characteristicts?.isOfficeEmployee || 'Unknown',
            typeOfHazard: user.main_Characteristicts?.typeOfHazard || 'Unknown',
            educationalStatus: user.other_Characteristicts?.educationalStatus || 'Unknown',
            departmentName: user.department?.name || 'Unknown',
            tasksName : user.department?.tasks?.name || 'Unknown',
            costcentersName : user.department?.costCenters?.name || 'Unknown',
            budget : user.department?.costCenters?.budget || 'Unknown',
            // Ekstra alanlar gerekiyorsa buraya ekleyebilirsiniz
        }));
    };

    useEffect(() => {
        const fetchData = async () => {

            try {
                console.log("EventID", EventID);

                if (EventID) {
                    const response = await axios.get(`https://localhost:7282/Events_UsersDTO/${EventID}`);

                    setDatas(transformData(response.data.user));
                    setFilteredDatas(response.data.user);
                    console.log("Response data:", response.data);

                    console.log("Filtered data:", filteredData);
                }
            } catch (err) {
                setError(err);
                console.error('Error fetching data:', err);
            }
            //console.log("Datas:" ,datas);
        };
        fetchData();
    }, [EventID]);

    // Rest of the code remains the same  


    const columns = [
        { headerName: "Ad Soyad", field: "fullName", checkboxSelection: true, filter: 'agTextColumnFilter' },
        { headerName: "Doğum Tarihi", field: "dateOfBirth", filter: 'agDateColumnFilter' },
        { headerName: "Email Adresi", field: "mailAddress" },
        { headerName: "Personel Sicil No", field: "userRegistrationID" },
        { headerName: "İşe Giriş Tarihi", field: "hireDate", filter: 'agDateColumnFilter' },
        { headerName: "Telefon Numarası", field: "phoneNumber" },
        { headerName: "Cinsiyet", field: "gender", filter: 'agSetColumnFilter' },
        { headerName: "Ana-Çalışma Şekli", field: "workingMethod", filter: 'agSetColumnFilter' },
        { headerName: "Ana-Çalışma Alanı", field: "isOfficeEmployee", filter: 'agSetColumnFilter' },
        { headerName: "Ana-Tehlike Türü", field: "typeOfHazard", filter: 'agSetColumnFilter' },
        { headerName: "Diğer-Eğitim Durumu", field: "educationalStatus", filter: 'agSetColumnFilter' },
        { headerName: "Departman", field: "departmentName", filter: 'agSetColumnFilter' },
        { headerName: "Görev", field: "tasksName" },
        { headerName: "Masraf Merkezi İsmi", field: "costcentersName" },
        { headerName: "Masraf Merkezi Bütçesi", field: "budget" },
    ];
    // console.log("Columns:", columns); 

    const tableRows = [];
    console.log("Datas:", datas);
    datas.forEach(EventUsers => {

        tableRows.push(
            <tr key={EventUsers.cardID}>
                <td>{EventUsers.fullName}</td>
                <td>{EventUsers.dateOfBirth}</td>
                <td>{EventUsers.mailAddress}</td>
                <td>{EventUsers.userRegistrationID}</td>
                <td>{EventUsers.hireDate}</td>
                <td>{EventUsers.phoneNumber}</td>
                <td>{EventUsers.gender}</td>
                <td>{EventUsers.workingMethod}</td>
                <td>{EventUsers.isOfficeEmployee}</td>
                <td>{EventUsers.typeOfHazard}</td>
                <td>{EventUsers.educationalStatus}</td>
                <td>{EventUsers.departmentName}</td>
                <td>{EventUsers.tasksName}</td>  
                <td>{EventUsers.costcentersName}</td> 
                <td>{EventUsers.budget}</td> 

            </tr>

        );
    });


    const onGridReady = params => {
        gridRef.current = params.api;
    };

    const onExportClick = useCallback(() => {
        const visibleColumns = gridRef.current.getAllDisplayedColumns()
                                .map(column => column.colId);
                                
        const params = {
            columnKeys: visibleColumns  // Yalnızca görünür sütunları dışa aktar
        };

        gridRef.current.exportDataAsExcel(params);
    }, []);

    const defaultColDef = {
        sortable: true,
        editable: false,  // Varsayılan olarak düzenlenemez
        filter: true,
        floatingFilter: true,
        flex: 1 // Flex özelliği ile sütun genişliği dinamik olabilir
    };

    const handleLoGoClick = () => {
        navigate("/");
    };
    

    return (
        <div>
            <header className="header">
                <div className="logo-container">
                    <img src={`${process.env.PUBLIC_URL}/logo-esbas.png`} className="logo" onClick={handleLoGoClick} />
                </div>
                
                <button className='export-button' onClick={onExportClick}>Excel'e Aktar</button>
            </header>
            
            <div className="body-content">
                <div id="myGrid" className="ag-theme-alpine grid-container">
                    <AgGridReact
                        ref={gridRef}
                        rowData={datas}
                        columnDefs={columns}
                        defaultColDef={defaultColDef}
                        onGridReady={onGridReady}
                        rowSelection='multiple'
                        pagination={true}
                        paginationPageSize={10}
                        popupParent={document.body}
                    />
                </div>
            </div>
        </div>
    );
    
    
}

export default Plist;




 // const onGridReady = params => {
    //     gridRef.current = params.api;
    // };

    // const onExportClick = useCallback(() => {
    //     const params = {
    //         columnKeys: gridRef.current.getAllColumns()
    //                       .filter(col => col.isVisible()) // Görünür sütunları filtrele
    //                       .map(col => col.getColId()) // Sütun ID'lerini al
    //     };
    //     gridRef.current.exportDataAsExcel(params);
    // }, []);



 //----------------------------------------
    // const onGridReady = params => {
    //     gridRef.current = params.api;
    //     columnApi.current = params.columnApi;
    // };


    

    // const onExportClick = useCallback(() => {
    //     gridRef.current.api.exportDataAsExcel(getParams());
    // }, []);

    //---------------------------------------------
// const onExportClick = () => {
    //     if (gridRef.current) {
    //         // Grid'deki tüm verileri alın
    //         const allData = [];
    //         gridRef.current.forEachNode((node) => allData.push(node.data));

    //         // XLSX formatına çevirin
    //         const worksheet = XLSX.utils.json_to_sheet(allData);
    //         const workbook = XLSX.utils.book_new();
    //         XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

    //         // Excel dosyasını indirin
    //         XLSX.writeFile(workbook, 'exported_data.xlsx');
    //     }
    // };

