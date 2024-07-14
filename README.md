# react-smart-table-component

[![npm version](https://badge.fury.io/js/react-smart-table-component.svg)](https://badge.fury.io/js/react-smart-table-component) [![npm](https://img.shields.io/npm/dm/react-smart-table-component.svg?logo=npm)](https://www.npmjs.com/package/react-smart-table-component) [![npm](https://img.shields.io/bundlephobia/minzip/react-smart-table-component)](https://www.npmjs.com/package/react-smart-table-component)

An intelligent, dynamic React component, built entirely with TypeScript. This component is equipped with built-in features such as infinite scrolling, pagination, search and now includes the newly added sorting functionality. It provides a seamless user experience for data-intensive applications, allowing for efficient navigation and organization of data.

[CodeSandbox](https://codesandbox.io/s/zen-hofstadter-7m2rnl)

[Live Demo](https://rawasthi231.github.io/smart-table-component)

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

#### Basic usage:

```jsx
import React from "react";
import ReactSmartTableComponent from "react-smart-table-component";

export default function Users({ loading, data }) {
  return (
    <ReactSmartTableComponent
      items={data}
      headings={[
        { fieldName: "name", title: "Name" },
        { fieldName: "email", title: "Email" },
        { fieldName: "phone", title: "Phone" },
        { fieldName: "address", title: "Address" },
        { fieldName: "company", title: "Company" },
      ]}
      loading={loading}
      scopedFields={{
        address: (item) => (
          <td>{`${item.address.street}, ${item.address.city}, ${item.address.state}, ${item.address.zipcode}`}</td>
        ),
        company: (item) => (
          <td>{`${item.company.name}, ${item.company.branch}`}</td>
        ),
      }}
    />
  );
}
```

##### Sample code for Next.JS (TypeScript)

```jsx
import Head from "next/head";
import Link from "next/link";
import dynamic from "next/dynamic";

import { UserInfo } from "@/typings";

const ReactSmartTableComponent = dynamic(
  () => import("react-smart-table-component"),
  {
    ssr: false,
    loading: () => <p>Loading...</p>,
  }
);

export default function Users({ users }: { users: UserInfo[] }) {
  return (
    <>
      <Head>
        <title>Users List</title>
        <meta name="description" content="Users Page" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ReactSmartTableComponent
        search
        parentClass="container mt-5"
        className="table table-responsive table-light table-striped"
        items={users as UserInfo[]}
        headings={[
          { fieldName: "id", title: "#" },
          { fieldName: "username", title: "Username", sortable: true },
          { fieldName: "name", title: "Name", sortable: true },
          { fieldName: "email", title: "Email", sortable: true },
          { fieldName: "phone", title: "Phone", sortable: true },
          { fieldName: "website", title: "Website", sortable: true },
          {
            fieldName: "address",
            title: "Address",
            colSpan: 3,
          },
        ]}
        scopedFields={{
          id: (item) => <td>{item.id}.</td>,
          username: (item) => (
            <td style={{ color: "#00aaff" }}>
              <Link href={`/users/${item.id}`}>{item.username}</Link>
            </td>
          ),
          address: (item) => (
            <>
              <td>{item.address.suite}</td>
              <td>{item.address.street}</td>
              <td>{`${item.address.city} ${item.address.zipcode}`}</td>
            </>
          ),
        }}
      />
    </>
  );
}

export async function getStaticProps() {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  const data = await response.json();
  return {
    props: {
      users: data,
    },
  };
}

```

##### Sample code for React.JS (Infinite Scroll)

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
      search
      recordsView="infinite-Scroll"
      className="theme-table"
      items={products}
      loading={loading}
      loadMore={loadMore}
      hasMoreRecords={hasMore}
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

## API

<table>
  <tr>
    <th>Name</th>
    <th>Type</th>
    <th>Required</th>
    <th>Default</th>
    <th>Description</th>
  </tr>
   <tr>
    <td>items</td>
    <td>array</td>
    <td>true</td>
    <td>Array</td>
    <td>Provide the data list which you wanna iterate through</td>
  </tr>
  <tr>
    <td>headings</td>
    <td>object</td>
    <td>true</td>
    <td>Array</td>
    <td>The headings of the table</td>
  </tr>
  <tr>
    <td>scopedFields</td>
    <td>object</td>
    <td>false</td>
    <td>undefined</td>
    <td>You can customize the layout of a particular cell via using this prop. Pass your custom cell body</td>
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
    <td>The default behaviour of infinite scroll is scroll to down but if you pass this prop, inverse scroll will work upside down</td>
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
    <td>scrollable-area</td>
    <td>You can pass a parent wrapper class for the table to customize the styles. scrollable-area is a default class with some basic styles required for infinite scroll feature such as height, overflow etc.</td>
  </tr>
  </tr>
  <tr>
    <td>search</td>
    <td>boolean</td>
    <td>works conditionally</td>
    <td>undefined</td>
    <td>To get a search box for searching functionality, (search and searchableFields both props are co-related to each other, if you pass one of these prop, you also need to pass the other)</td>
  </tr>
  <tr>
    <td>searchableFields</td>
    <td>Array</td>
    <td>works conditionally</td>
    <td>undefined</td>
    <td>Pass the array of fields on which you want to perform the search (search and searchableFields both props are co-related to each other, if you pass one of these prop, you also need to pass the other)</td>
  </tr>
  <tr>
    <td>searchBoxPlaceholder</td>
    <td>string</td>
    <td>false</td>
    <td>undefined</td>
    <td>Placeholder text for search box</td>
  </tr>
  <tr>
    <td>stopDefaultSearch</td>
    <td>boolean</td>
    <td>false</td>
    <td>undefined</td>
    <td>Use this prop if you don't want to use the default search logic and want to implement your own search logic</td>
  </tr>
  <tr>
    <td>searchType</td>
    <td>default | fuzzy</td>
    <td>false</td>
    <td>undefined</td>
    <td>Search type </td>
  </tr>
  <tr>
    <td>onSearch</td>
    <td>(searchTerm: string) => void</td>
    <td>works conditionally</td>
    <td>undefined</td>
    <td>Event handler for the change event of search box</td>
  </tr>
  <tr>
    <td>searchBehavior</td>
    <td>debounce | throttle</td>
    <td>works conditionally</td>
    <td>undefined</td>
    <td>Search behavior: How onSearch will receive the input value</td>
  </tr>
  <tr>
    <td>noRecordsFound</td>
    <td>React.ReactNode | string</td>
    <td>false</td>
    <td>No record found</td>
    <td>Default text for empty data set is passed table items</td>
  </tr>
  <tr>
    <td>showNumbering</td>
    <td>boolean</td>
    <td>false</td>
    <td>false</td>
    <td>Gives a default numbering for the table records</td>
  </tr>
  <tr>
    <td>hideHeadings</td>
    <td>boolean</td>
    <td>false</td>
    <td>false</td>
    <td>Option to hide headings, if you don't want to show headings</td>
  </tr>
  <tr>
    <td>showNoMoreRecordsText</td>
    <td>boolean</td>
    <td>false</td>
    <td>undefined</td>
    <td>You can hide/show the default text for no more records available text in case of using infinite scroll</td>
  </tr>
  <tr>
    <td>noMoreRecordsText</td>
    <td>string</td>
    <td>false</td>
    <td>You are all caught up!</td>
    <td>You can pass custom text for no more records available text in case of using infinite scroll</td>
  </tr>
  <tr>
    <td>rowClassName</td>
    <td>function</td>
    <td>false</td>
    <td>undefined</td>
    <td>If you want to add custom css class on specific rows based on some conditions, you should use this prop.</td>
  </tr>
</table>
