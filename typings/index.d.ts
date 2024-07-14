import * as React from "react";

/* The `Heading<T>` interface defines the structure of a heading element for a table component.
 * Here's a breakdown of its properties:
 * - `align` (optional): The alignment of the heading text. Possible values are `left`, `center`, `right`, `justify`, and `char`.
 * - `colSpan` (optional): The number of columns that the heading should span.
 * - `fieldName`: The name of the field in the data object that the heading corresponds to.
 * - `rowSpan` (optional): The number of rows that the heading should span.
 * - `title` (optional): The title of the heading.
 * - `sortable` (optional): A boolean value indicating whether the heading is sortable.
 */
export interface Heading<T> {
  align?: "left" | "center" | "right" | "justify" | "char";
  colSpan?: number;
  fieldName: Extract<keyof T, string> | `action_${number}`;
  rowSpan?: number;
  title?: string;
  sortable?: boolean;
}

/**
 * The `ScopedFields<T>` type defines a mapping of field names to functions that generate React nodes for each item in the table. The keys of the mapping are the field names, and the values are functions that take an item of type `T` and return a React node.
 * @template T The type of the items in the table.
 * @example ```tsx
 * const scopedFields: ScopedFields<User> = {
 *  name: (user) => <td><span>{user.firstName} {user.lastName}</span></td>,
 *  email: (user) => <td><a href={`mailto:${user.email}`}>{user.email}</a></td>,
 * };
 * ```
 */
export type ScopedFields<T> = Partial<
  Record<Heading<T>["fieldName"], (item: T) => React.ReactNode>
>;

/**
 * The type `BaseSearchProps` defines properties for enabling search functionality on a data structure
 * of type `T`.
 * @property {boolean} search - The `search` property is a boolean flag that indicates whether the
 * search functionality is enabled or not. If set to `true`, it means that the component will have a
 * search feature available for use.
 * @property searchableFields - The `searchableFields` property in the `BaseSearchProps` type is an
 * array of strings that represent the fields of type `T` that can be searched. These fields are
 * extracted from the keys of the generic type `T`.
 * @property {string} searchBoxPlaceholder - The `searchBoxPlaceholder` property is a string that
 * specifies the placeholder text to be displayed in the search input box. It is used to provide a hint
 * or example of the type of information that can be entered in the search box.
 * @property {"default" | "fuzzy"} searchType - The `searchType` property in the `BaseSearchProps` type
 * specifies the type of search to be performed. It can have one of two values: "default" or "fuzzy".
 * This property is used to determine the search algorithm or strategy to be applied when searching for
 * items based on the
 * @property {boolean} stopDefaultSearch - The `stopDefaultSearch` property in the `BaseSearchProps`
 * type is a boolean flag that indicates whether the default search behavior should be stopped or not.
 * If set to `true`, it means that the default search functionality should be disabled or overridden in
 * some way.
 */
export type BaseSearchProps<T> = {
  search?: boolean;
  searchableFields?: Array<Extract<keyof T, string>>;
  searchBoxPlaceholder?: string;
  searchType?: "default" | "fuzzy";
  stopDefaultSearch?: boolean;
};

type OnSearch = (searchTerm: string) => void;

type SearchableFields<T> = Array<Extract<keyof T, string>>;

/**
 * The `SearchProps<T>` type defines the properties for enabling search functionality on a data structure of type `T`. It extends the `BaseSearchProps<T>` type and adds additional properties for configuring the search behavior. The `SearchProps<T>` type is a union type that can have one of three possible configurations: a search feature with search behavior, a search feature without search behavior, or no search feature at all. The properties of the `SearchProps<T>` type are as follows:
 * @property {SearchableFields} searchableFields - The `searchableFields` property in the `SearchProps<T>` type is an array of strings that represent the fields of type `T` that can be searched. These fields are extracted from the keys of the generic type `T`.
 * @property {OnSearch} onSearch - The `onSearch` property in the `SearchProps<T>` type is a function that takes a search term as an argument and performs a search operation based on the searchable fields. This function is called when the user enters a search term in the search input box and submits the search query.
 * @property {"debounce" | "throttle"} searchBehavior - The `searchBehavior` property in the `SearchProps<T>` type specifies the behavior of the search feature. It can have one of two values: "debounce" or "throttle". This property is used to control the frequency of search operations when the user enters a search term in the search input box. If set to "debounce", the search operation is delayed until the user stops typing for a specified period. If set to "throttle", the search operation is limited to a certain number of calls per second.
 * @example ```tsx
 * const searchProps: SearchProps<User> = {
 * search: true,
 * searchableFields: ["name", "email"],
 * onSearch: (searchTerm) => {
 * // Perform search operation based on the search term
 * },
 * searchBehavior: "debounce",
 * };
 */

export type SearchProps<T> = BaseSearchProps<T> &
  (
    | {
        search: boolean;
        searchableFields: SearchableFields<T>;
        onSearch: OnSearch;
        searchBehavior: "debounce" | "throttle";
      }
    | {
        search: boolean;
        searchableFields: SearchableFields<T>;
        onSearch?: never;
        searchBehavior?: never;
      }
    | {
        search?: never;
        searchableFields?: never;
        onSearch?: never;
        searchBehavior?: never;
      }
  );

/* The `SmartTableProps<T>` interface is defining the properties that can be passed to a smart table component.
 * Here's a breakdown of what each property is for:
 * - `currentPage` (optional): The current page number of the table.
 * - `customLoader` (optional): A custom loader component to be displayed when the table is loading.
 * - `hasMoreRecords` (optional): A boolean value indicating whether there are more records to be loaded.
 * - `headings`: An array of heading objects that define the structure of the table.
 * - `items`: An array of items to be displayed in the table.
 * - `loading` (optional): A boolean value indicating whether the table is loading.
 * - `recordsView` (optional): The type of records view to be displayed. Possible values are `infinite-Scroll` and `pagination`.
 * - `inverseScroll` (optional): A boolean value indicating whether the scroll direction is inverted.
 * - `loadMore` (optional): A function to be called when more records need to be loaded.
 * - `noRecordsFound` (optional): A custom message to be displayed when no records are found.
 * - `onPageChange` (optional): A function to be called when the page changes.
 * - `onRowClick` (optional): A function to be called when a row is clicked.
 * - `parentClass` (optional): A custom class name to be applied to the table.
 * - `recordsPerPage` (optional): The number of records to be displayed per page.
 * - `scopedFields` (optional): A mapping of field names to functions that generate React nodes for each item in the table.
 * - `showNumbering` (optional): A boolean value indicating whether to show numbering in the table.
 * - `totalPages` (optional): The total number of pages in the table.
 * - `hideHeadings` (optional): A boolean value indicating whether to hide the headings in the table.
 * - `showNoMoreRecordsText` (optional): A boolean value indicating whether to show the no more records text.
 * - `noMoreRecordsText` (optional): The text to be displayed when there are no more records to load.
 * - `rowClassName` (optional): A function to generate a custom class name for each row in the table.
 * @template T The type of the items in the table.
 * @example ```tsx
 * const headings: Heading<User>[] = [
 * { fieldName: "name", title: "Name" },
 * { fieldName: "email", title: "Email" },
 * ];
 * const items: User[] = [
 * { name: "John Doe", email: "john@example.com"},
 * ];
 * const scopedFields: ScopedFields<User> = {
 * name: (user) => <td><span>{user.firstName} {user.lastName}</span></td>,
 * email: (user) => <td><a href={`mailto:${user.email}`}>{user.email}</a></td>,
 * };
 * const searchProps: SearchProps<User> = {
 * search: true,
 * searchableFields: ["name", "email"],
 * onSearch: (searchTerm) => {
 * // Perform search operation based on the search term
 * },
 * searchBehavior: "debounce",
 * };
 * const smartTableProps: SmartTableProps<User> = {
 * currentPage: 1,
 * customLoader: <CustomLoader />,
 * headings,
 * items,
 * loading: false,
 * recordsView: "pagination",
 * noRecordsFound: "No records found",
 * onPageChange: (page) => {
 * // Handle page change
 * },
 * onRowClick: (item) => {
 * // Handle row click
 * },
 * parentClass: "custom-table",
 * recordsPerPage: 10,
 * scopedFields,
 * showNumbering: true,
 * totalPages: 5,
 * hideHeadings: false,
 * showNoMoreRecordsText: false,
 * };
 * ```
 */
export interface SmartTableProps<T>
  extends React.TableHTMLAttributes<HTMLTableElement> {
  currentPage?: number;
  customLoader?: React.ReactNode | string;
  hasMoreRecords?: boolean;
  headings: Heading<T>[];
  items: Array<T>;
  loading?: boolean;
  recordsView?: "infinite-Scroll" | "pagination";
  inverseScroll?: boolean;
  loadMore?: () => void;
  noRecordsFound?: React.ReactNode | string;
  onPageChange?: (page: number) => void;
  onRowClick?: (item: T) => void;
  parentClass?: string;
  recordsPerPage?: number;
  scopedFields?: ScopedFields<T>;
  showNumbering?: boolean;
  totalPages?: number;
  hideHeadings?: boolean;
  showNoMoreRecordsText?: boolean;
  noMoreRecordsText?: string;
  rowClassName?: (item: T) => string;
}

/**
 * The `ReactSmartTableComponentProps<T>` type defines the properties that can be passed to a smart table component in a React application. It extends the `SmartTableProps<T>` and `SearchProps<T>` types and combines them into a single type. The `ReactSmartTableComponentProps<T>` type is a union type that can have one of three possible configurations: a smart table component with search functionality, a smart table component without search functionality, or no smart table component at all. The properties of the `ReactSmartTableComponentProps<T>` type are as follows:
 */
export type ReactSmartTableComponentProps<T> = SmartTableProps<T> &
  SearchProps<T>;

/**
 * The `ReactSmartTableComponent` function is a React component that renders a smart table with the specified properties. It takes a single argument of type `ReactSmartTableComponentProps<T>` and returns a React element.
 */
declare const ReactSmartTableComponent: <T>(
  props: ReactSmartTableComponentProps<T>
) => React.ReactElement;

export default ReactSmartTableComponent;
