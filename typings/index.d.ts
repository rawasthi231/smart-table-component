import * as React from 'react';

export interface Heading<T> {
    align?: "left" | "center" | "right" | "justify" | "char";
    colSpan?: number;
    fieldName: Extract<keyof T, string> | `action_${number}`;
    rowSpan?: number;
    title?: string;
}

export type ScopedFields<T> = Partial<
    Record<Heading<T>["fieldName"], (item: T) => React.ReactNode>
>;

export interface SmartTableProps<T> extends React.TableHTMLAttributes<HTMLTableElement> {
    currentPage?: number;
    customLoader?: React.ReactNode | string;
    hasMoreRecords?: boolean;
    headings: Heading<T>[];
    items: Array<T>;
    loading?: boolean;
    recordsView?: "infinite-Scroll" | "pagination";
    inverseScroll?: boolean;
    loadMore?: () => void;
    onPageChange?: (page: number) => void;
    onRowClick?: (item: T) => void;
    parentClass?: string;
    recordsPerPage?: number;
    scopedFields?: ScopedFields<T>;
    totalPages?: number;
}

export declare const ReactSmartTable: React.FC<SmartTableProps<any>>;

type ReactSmartTableComponentType = <T>(props: SmartTableProps<T>) => React.ReactElement;

declare const ReactSmartTableComponent: ReactSmartTableComponentType;

export default ReactSmartTableComponent;