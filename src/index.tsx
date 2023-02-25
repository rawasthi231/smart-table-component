import * as React from "react";
import * as ReactDOM from "react-dom";

import SmartTable from "../dist/index";

export interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
}

export interface Company {
  name: string;
  catchPhrase: string;
  bs: string;
}

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: Address;
  phone: string;
  website: string;
  company: Company;
}

function App() {
  const [users, setUsers] = React.useState<User[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);

  React.useEffect(() => {
    (async () => {
      setLoading(true);
      const data = await fetch(
        "https://jsonplaceholder.typicode.com/users"
      ).then((data) => data.json());
      setUsers(data);
      setLoading(false);
    })();
  }, []);

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
        address: (item: User) => <td>{`${item.address.street}`}</td>,
        company: (item: User) => <td>{`${item.company.name}`}</td>,
      }}
    />
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
