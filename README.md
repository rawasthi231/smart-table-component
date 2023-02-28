# react-smart-table-component

A smart and fully dynamic React Component purely build with TypeScript which has inbuilt functionality of infinite scroll and pagination

## Features

- Support of React 18 and Typescript
- Generic types for table info such as Headings and Body
- No CSS included, Add your customized styles
- Infinite scroll feature (Default scroll and UpSide Down Scroll)
- Pagination feature
- Scoped fields feature

## Installation

[![NPM](https://nodei.co/npm/react-smart-table-component.png?compact=true)](https://nodei.co/npm/react-smart-table-component/)

#### To install the latest stable version:

```
npm install --save react-smart-table-component
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
    <td>None</td>
    <td>You can customize the info of a particular cell via using this prop</td>
  </tr>
   <tr>
    <td>loading</td>
    <td>boolean</td>
    <td>false</td>
    <td>false</td>
    <td>This provides a loading text</td>
  </tr>
     <tr>
    <td>onRowClick</td>
    <td>function</td>
    <td>false</td>
    <td>None</td>
    <td>It provides the row info on which the user clicks</td>
  </tr>
  <tr>
    <td>customLoader</td>
    <td>React Node</td>
    <td>false</td>
    <td>None</td>
    <td>You can provide a custom loader of the table</td>
  </tr>
  <tr>
    <td>recordsView</td>
    <td>string</td>
    <td>false</td>
    <td>None</td>
    <td>You can provide the data view pattern as either 'infinite-Scroll' or 'pagination'</td>
  </tr>
   <tr>
    <td>inverseScroll</td>
    <td>boolean</td>
    <td>false</td>
    <td>false</td>
    <td>The default behaviour of infinite scroll is scroll to down but if you set this flag to true you can also use inverse scroll as well</td>
  </tr>
    <tr>
    <td>hasMoreRecords</td>
    <td>boolean</td>
    <td>false</td>
    <td>false</td>
    <td>It is a flag to indicate the component that there are more records to display so that it can trigger loadMore function</td>
  </tr>
  <tr>
    <td>loadMore</td>
    <td>function</td>
    <td>false</td>
    <td>None</td>
    <td>This method is called when the table scroll cross the threshold </td>
  </tr>
  <tr>
    <td>totalPages</td>
    <td>number</td>
    <td>false</td>
    <td>None</td>
    <td>Total number of pages</td>
  </tr>
   <tr>
    <td>currentPage</td>
    <td>number</td>
    <td>false</td>
    <td>None</td>
    <td>Current page value</td>
  </tr>
   <tr>
    <td>onPageChange</td>
    <td>function</td>
    <td>false</td>
    <td>None</td>
    <td>It returns the clicked page number</td>
  </tr>
</table>
