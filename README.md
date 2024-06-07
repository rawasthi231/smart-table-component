# react-smart-table-component

[![npm version](https://badge.fury.io/js/react-smart-table-component.svg)](https://badge.fury.io/js/react-smart-table-component) [![npm](https://img.shields.io/npm/dm/react-smart-table-component.svg?logo=npm)](https://www.npmjs.com/package/react-smart-table-component) [![npm](https://img.shields.io/bundlephobia/minzip/react-smart-table-component)](https://www.npmjs.com/package/react-smart-table-component)

An intelligent, dynamic React component, built entirely with TypeScript. This component is equipped with built-in features such as infinite scrolling, pagination, search and now includes the newly added sorting functionality. It provides a seamless user experience for data-intensive applications, allowing for efficient navigation and organization of data.


[CodeSandbox](https://codesandbox.io/s/zen-hofstadter-7m2rnl)

## Features

- Support of React 18, NextJS and Typescript
- Use custom types for headings and body
- Can use default CSS or add your customized styles
- Option for both Pagination and Infinite scroll feature (Default scroll and Upside down scroll)
- Scoped fields option to use custom JSX in any cell of the table

## Installation

[![NPM](https://nodei.co/npm/react-smart-table-component.png?compact=true)](https://nodei.co/npm/react-smart-table-component/)

#### To install the latest stable version:

```
npm install --save react-smart-table-component
```

##### Sample code for infinite scroll

```jsx
import { useState, useEffect, useRef, useCallback } from "react";

import ReactSmartTableComponent from "react-smart-table-component";

import "react-smart-table-component/dist/styles.css";

export default function App() {
  const [products, setProducts] = useState([]);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(false);
  const [loading, setLoading] = useState(false);

  const offsetRef = useRef(offset);
  const hasMoreRef = useRef(hasMore);
  const productsRef = useRef(products);

  useEffect(() => {
    hasMoreRef.current = hasMore;
    offsetRef.current = offset;
    productsRef.current = products;
  }, [offset, hasMore, products]);

  const fetchProducts = useCallback(
    async (firstLoad) => {
      setLoading(true);
      const data = await fetch(
        `https://dummyjson.com/products?limit=10&skip=${offsetRef.current}&select=title,price,brand,category,thumbnail,rating,description`,
        { headers: { "Accept-Encoding": "gzip,deflate,compress" } }
      ).then((data) => data.json());
      if (data && data.products) {
        if (data.products.length < 10) setHasMore(false);
        else setHasMore(true);

        setOffset(firstLoad ? 10 : offsetRef.current + 10);
        const records = firstLoad
          ? data.products
          : [...productsRef.current, ...data.products];
        setProducts(records);
      }
      setLoading(false);
    },
    [products, offsetRef, productsRef]
  );

  useEffect(() => {
    fetchProducts(true);
  }, []);

  /**
   * Load more records
   */
  const loadMore = () => {
    setTimeout(() => {
      if (hasMoreRef.current) {
        fetchProducts(false);
      }
    }, 500);
  };

  return (
    <ReactSmartTableComponent
      items={products}
      headings={[
        { fieldName: "thumbnail", title: "Thumbnail" },
        { fieldName: "title", title: "Title" },
        { fieldName: "price", title: "Price", sortable: true },
        { fieldName: "brand", title: "Brand" },
        { fieldName: "category", title: "Category" },
        { fieldName: "rating", title: "Rating", sortable: true },
        { fieldName: "description", title: "Description" },
        { fieldName: "action_1", title: "Action" },
      ]}
      loading={loading}
      recordsView="infinite-Scroll"
      className="theme-table"
      hasMoreRecords={hasMore}
      loadMore={loadMore}
      scopedFields={{
        thumbnail: (item) => (
          <td>
            <img
              src={item.thumbnail}
              alt="thumbnail"
              height={100}
              width={100}
            />{" "}
          </td>
        ),
        action_1: (item) => (
          <td>
            <button
              onClick={() =>
                alert(
                  `Item Name: ${item.title}\nItem Price: ${item.price}\nItem Brand: ${item.brand}\nItem Description: ${item.description}`
                )
              }
            >
              View More
            </button>
          </td>
        ),
      }}
    />
  );
}
```

#### Basic usage:

##### As class component

```jsx
import React, { Component } from "react";

import SmartTable from "react-smart-table-component";

export default class App extends Component {
  state = { users: [], hasMore: true };

  loadMore = () => {
    this.setState({
      users: this.state.users.concat([...moreData]),
    });
  };

  render() {
    return (
      <SmartTable
        items={this.state.users}
        headings={[
          { fieldName: "name", title: "Name" },
          { fieldName: "email", title: "Email" },
          { fieldName: "phone", title: "Phone" },
          { fieldName: "address", title: "Address" },
          { fieldName: "company", title: "Company" },
        ]}
        loading={loading}
        scopedFields={{
          address: (item) => <td>{`${item.address.street}`}</td>,
          company: (item) => <td>{`${item.company.name}`}</td>,
        }}
        loadMore={this.loadMore}
        hasMoreRecords={this.state.hasMore}
      />
    );
  }
}
```

##### As functional component with hooks

```jsx
import React, { useState } from "react";
import SmartTable from "react-smart-table-component";
export default function Users() {
  const [users, setUsers] = useState([]);
  const [hasMore, setHasMore] = useState(false);

  const loadMore = () => {
    setUsers([...users, ...moreData]);
    setHasMore(true);
  };

  return (
    <SmartTable
      items={users}
      headings={[
        { fieldName: "name", title: "Name" },
        { fieldName: "email", title: "Email" },
        { fieldName: "phone", title: "Phone" },
        { fieldName: "address", title: "Address" },
        { fieldName: "company", title: "Company" },
      ]}
      loading={loading}
      scopedFields={{
        address: (item) => <td>{`${item.address.street}`}</td>,
        company: (item) => <td>{`${item.company.name}`}</td>,
      }}
      loadMore={loadMore}
      hasMoreRecords={hasMore}
    />
  );
}
```

## API

<table>
  <tr>
    <th>Name<br/></th>
    <th>Type</th>
    <th>Required</th>
    <th>Default</th>
    <th>Description</th>
  </tr>
   <tr>
    <td>items</td>
    <td>array</td>
    <td>true</td>
    <td>[]</td>
    <td>Provide the data list which you wanna iterate through</td>
  </tr>
  <tr>
    <td>headings</td>
    <td>object</td>
    <td>true</td>
    <td>Table heading info</td>
    <td>The heads of the table rows</td>
  </tr>
  <tr>
    <td>scopedFields</td>
    <td>object</td>
    <td>false</td>
    <td>undefined</td>
    <td>You can customize the info of a particular cell via using this prop</td>
  </tr>
   <tr>
    <td>loading</td>
    <td>boolean</td>
    <td>false</td>
    <td>undefined</td>
    <td>This provides a loading text</td>
  </tr>
     <tr>
    <td>onRowClick</td>
    <td>function</td>
    <td>false</td>
    <td>undefined</td>
    <td>It provides the row info on which the user clicks</td>
  </tr>
  <tr>
    <td>customLoader</td>
    <td>React Node</td>
    <td>false</td>
    <td>undefined</td>
    <td>You can provide a custom loader of the table</td>
  </tr>
  <tr>
    <td>recordsView</td>
    <td>string</td>
    <td>false</td>
    <td>undefined</td>
    <td>You can provide the data view pattern as either 'infinite-Scroll' or 'pagination'</td>
  </tr>
   <tr>
    <td>inverseScroll</td>
    <td>boolean</td>
    <td>false</td>
    <td>undefined</td>
    <td>The default behaviour of infinite scroll is scroll to down but if you set this flag to true you can also use inverse scroll as well</td>
  </tr>
    <tr>
    <td>hasMoreRecords</td>
    <td>boolean</td>
    <td>false</td>
    <td>undefined</td>
    <td>It is a flag to indicate the component that there are more records to display so that it can trigger loadMore function</td>
  </tr>
  <tr>
    <td>loadMore</td>
    <td>function</td>
    <td>false</td>
    <td>undefined</td>
    <td>This method is called when the table scroll cross the threshold </td>
  </tr>
  <tr>
    <td>totalPages</td>
    <td>number</td>
    <td>false</td>
    <td>undefined</td>
    <td>Total number of pages</td>
  </tr>
   <tr>
    <td>currentPage</td>
    <td>number</td>
    <td>false</td>
    <td>undefined</td>
    <td>Current page value</td>
  </tr>
   <tr>
    <td>onPageChange</td>
    <td>function</td>
    <td>false</td>
    <td>undefined</td>
    <td>It returns the clicked page number</td>
  </tr>
  </tr>
   <tr>
    <td>parentClass</td>
    <td>string</td>
    <td>false</td>
    <td>"scrollable-area"</td>
    <td>It's a default class with some basic styles required for infinite scroll feature</td>
  </tr>
  </tr>
   <tr>
    <td>search</td>
    <td>boolean</td>
    <td>false</td>
    <td>undefined</td>
    <td>To get a search box for searching functionality</td>
  </tr>
</table>
