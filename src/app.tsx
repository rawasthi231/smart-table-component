import * as React from "react";

import Table from "../dist/index";

function App() {
  return (
    <div>
      <Table
        items={[
          {
            name: "Raghvendra Awasthi",
            age: "26",
            profession: "Software Developer",
          },
        ]}
        loading={false}
        headings={[
          { fieldName: "name", title: "Name" },
          { fieldName: "age", title: "Age" },
          { fieldName: "profession", title: "Profession" },
        ]}
        recordsView="infinite-Scroll"
        className="theme-table"
      />
    </div>
  );
}

export default App;
