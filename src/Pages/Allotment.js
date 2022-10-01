import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../Pages/CSS/Dashboard.css';
import axios from 'axios';
import _ from 'lodash';
import { isDisabled } from '@testing-library/user-event/dist/utils';
import { checkAuthentication, clearToken } from '../util/authentication';
import Logout from '../Components/Logout';
import ActionDropdown from '../Components/ActionDropdown';
import NavbarCollapse from '../Components/NavbarCollapse';



const Allotment = () => {
  const [myData, setMyData] = useState([]);
  const [paginatedData, setPaginatedData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1)
  const [maxContent, setMaxContent] = useState(5)
  const totalPages = Math.ceil(myData.length / maxContent);
  const [count, setCount] = useState(2);



  useEffect(() => {

    axios.get('http://182.70.249.68:9000/v1/allotment/getAll?limit=10&page=', {
      headers: {
        'Authorization': `Bearer ${localStorage.token}`,
        'Content-type': 'application/json'
      },

    })
      .then((res => {
        setMyData(res.data.data.results);
        setPaginatedData(_(res.data.data.results).slice(0).take(maxContent).value())
      }))
  }, [])
  const pagination = (pageNo) => {
    setCurrentPage(pageNo);
    const startIndex = (pageNo - 1) * maxContent;
    const paginatedSinglePageData = _(myData).slice(startIndex).take(maxContent).value();
    setPaginatedData(paginatedSinglePageData);
  }

  const lastPage = () => {
    pagination(totalPages);

  }

  const nextPage = () => {
    pagination(currentPage + 1)
  }

  const firstPage = () => {
    pagination(1)
  }

  const previousPage = () => {
    console.log(currentPage);
    pagination(currentPage - 1)
  }

  const handleLogout = () => {
    clearToken();
  }

  console.log(paginatedData);

  return (
    <div className='dashboard'>
      <NavbarCollapse/>
      {<nav className="navLogout navbar navbar-expand-lg navbar-primary">
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <Logout></Logout>
            

          </div>
        </div>
      </nav>}
      <h1 className='dashboardHead toptitle mb-lg-3'>Allotment Data</h1>
      <ul className="sidebar">
        <h1 className='sidebarHead'>Support</h1>
        <hr className='headline' />
        <li className='sideOption'>Needy</li>
        <li className='sideOption'>Resources</li>
        <li className='sideOption'>Allotment Form</li>
        <li className='sideOption' href="#news">Allotment Data</li>
        <li className='sideOption' href="#contact">Check Due</li>
      </ul>

      <table className="table">
        <thead className='tabHead'>
          <tr>
            <th scope="col" >Needy Name</th>
            <th scope="col">Needy Email</th>
            <th scope="col">Needy Contact</th>
            <th scope="col">Resource Name</th>
            <th scope="col">Resource Contact</th>
            <th scope="col">Resource Email</th>
            <th scope="col">Payment Status</th>
            <th scope="col">Status</th>
            <th scope="col">Start Date</th>
            <th scope="col">Timing</th>
            <th scope="col">Due Date</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>

          {paginatedData.map((item, i) => (
            <tr className='rows' key={i}>
              <td>{item.needyName}.</td>
              <td>{item.needyEmail}</td>
              <td>{item.needyContact}</td>
              <td>{item.resourceName}.</td>
              <td>{item.resourceContact}</td>
              <td>undefined</td>
              <td>{item.paymentStatus}</td>
              <td>{item.status}</td>
              <td>{item.startDate}</td>
              <td><div>{item.timing.map((time, k) => { return <span key={Math.random*100}>{time.startTime} to {time.endTime}<br /></span> })}</div></td>
              <td>{item.nextPaymentDueOn}</td>
              <td><ActionDropdown/></td>
            </tr>
          ))}

        </tbody>
      </table>
      <div className='footer'>
        {totalPages === 1 ? <></> :
          <nav className='d-flex justify-content-center'>
            <ul className='pagination'>
              <button className='previous-btn' type="button" onClick={count < 1 ? isDisabled : firstPage}>First</button>
              <li className='previous' onClick={currentPage <= 1 ? isDisabled : previousPage}><i className="fa-solid fa-angle-left fa-2x mx-2"></i></li>
              {[...Array(totalPages)].map((a, i) => {
                if ((i + 1 <= currentPage - 2 && i + 1 >= currentPage - 5) || (i + 1 >= currentPage + 2 && i + 1 <= currentPage + 5)) {
                  return <div >.</div>
                } else if (i + 1 < currentPage - 5 || i + 1 > currentPage + 5) {
                  return <div ></div>
                }
                return (<li className={
                  (i + 1) === currentPage ? 'page-item active' : 'page-item'}>
                  <p className='page-link' onClick={() => {
                    pagination(i + 1)
                  }}>{i + 1}</p>
                </li>
                )
              })}
              <li className='next' type="button" onClick={currentPage >= totalPages ? isDisabled : nextPage}><i className="fa-solid fa-angle-right fa-2x mx-2"></i></li>
              <button className='next-btn' type="button" onClick={count >= 5 ? isDisabled : lastPage}>Last</button>
            </ul>

          </nav>
        }
      </div>
    </div>
  )
}

export default Allotment

