import React, { useState, useEffect } from 'react';
import { withRouter, Link } from 'react-router-dom';
import styles from './style.module.scss';

const BreadCrumb = ({ history, location, match }) => {
  let [crumb, setCrumb] = useState([]);
  console.log(crumb);
  useEffect(() => {
    let arr = [];
    let pathName = location.pathname.split('/')[1];
    arr.push({ label: pathName, link: `/${pathName}` });
    if (match.path !== '/') {
      if (match.params.id) {
        arr.push({ label: 'Edit', link: '#' });
      } else {
        arr.push({ label: 'New', link: '#' });
      }
    }
    if (location.pathname.split('/')[2] === 'promo-codes') {
      arr.push({ label: 'Promo-codes', link: `/${pathName}` });
    }
    if (location.pathname.split('/')[3] === 'edit') {
      arr.push({ label: 'Edit', link: '#' });
    } else if (location.pathname.split('/')[4] === 'edit') {
      arr.push({ label: 'Edit', link: '#' });
    } else if (location.pathname.split('/')[2] === 'new') {
      arr.push({ label: 'New', link: '#' });
    } else if (location.pathname.split('/')[3] === 'new') {
      arr.push({ label: 'New', link: '#' });
    }
    // console.log(location.pathname.split('/'));
    setCrumb(arr);
  }, [history]);

  const renderBreadCrumb = crumb.map((bread, index) => {
    return (
      <li
        key={index}
        className={`${styles.path} text-capitalize mx-0 breadcrumb-item`}
      >
        <Link to={bread.link}>{bread.label}</Link>
      </li>
    );
  });

  return (
    <>
      <div
      // className={`${styles.breadcrumbs}`}
      >
        <ol style={{ listStyle: 'none' }} className='d-flex px-3 breadcrumb'>
          {renderBreadCrumb}
        </ol>
      </div>
    </>
  );
};

export default withRouter(BreadCrumb);
