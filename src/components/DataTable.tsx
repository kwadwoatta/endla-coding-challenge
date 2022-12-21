/// <reference types="vite-plugin-svgr/client" />
import {
  faSave,
  faToggleOff,
  faToggleOn,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Column,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  Getter,
  Row,
  RowData,
  useReactTable,
} from "@tanstack/react-table";
import React, { HTMLProps, useMemo, useState } from "react";
import wellsData from "../data/data.json";
import { tableHeadStyle, tableStyle, tagStyle } from "./DataTable.css";

import AdditionalCell from "./AdditionalCell";

declare module "@tanstack/react-table" {
  interface TableMeta<TData extends RowData> {
    updateData: (rowIndex: number, columnId: string, value: unknown) => void;
  }
}

type Well = {
  id?: string;
  wellName?: string;
  locate?: string;
  show?: boolean;
  longitude?: number;
  latitude?: number;
  elevation?: number;
  tags?: string[];
  additional?: {
    wireline?: string[];
    pason?: string[];
    heatmap?: string;
  };
};

export function DataTable() {
  const wells = useMemo(() => wellsData, []);

  type InputCellProps = {
    min?: number;
    max?: number;
    getValue: Getter<string | undefined>;
    row: Row<Well>;
    column: Column<Well, number | undefined>;
  };

  const InputCell: React.FC<InputCellProps> = ({
    getValue,
    row: { index },
    column: { id },
    min,
    max,
  }) => {
    const initialValue = getValue();
    // We need to keep and update the state of the cell normally
    const [value, setValue] = React.useState(initialValue);

    // When the input is blurred, we'll call our table meta's updateData function
    const onBlur = () => {
      options.meta?.updateData(index, id, value);
    };

    // If the initialValue is changed external, sync it up with our state
    React.useEffect(() => {
      setValue(initialValue);
    }, [initialValue]);

    return (
      <input
        type={"number"}
        min={min}
        max={max}
        value={value as string}
        onChange={(e) => setValue(e.target.value)}
        onBlur={onBlur}
        style={{ width: 70 }}
      />
    );
  };

  const columnHelper = createColumnHelper<Well>();

  const columns = [
    columnHelper.accessor("wellName", {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          {...{
            checked: table.getIsAllRowsSelected(),
            indeterminate: table.getIsSomeRowsSelected(),
            onChange: table.getToggleAllRowsSelectedHandler(),
          }}
        />
      ),
      cell: ({ row }) => (
        <div className="px-1">
          <Checkbox
            {...{
              checked: row.getIsSelected(),
              indeterminate: row.getIsSomeSelected(),
              onChange: row.getToggleSelectedHandler(),
            }}
          />
        </div>
      ),
    }),
    columnHelper.accessor("wellName", {
      header: () => "Well Name",
      cell: (info) => info.getValue(),
    }),

    columnHelper.accessor((row) => row.locate, {
      id: "locate",
      header: () => <span>Locate</span>,
      cell: () => <button>Locate</button>,
    }),

    columnHelper.accessor("show", {
      header: () => "Show",
      cell: () => <ShowIcon />,
    }),

    columnHelper.accessor("tags", {
      header: () => "Tags",
      cell: (info) => (
        <div style={{ display: "flex", gap: 5 }}>
          {info.cell.getValue()!.map((value) => (
            <Tag name={value} />
          ))}
        </div>
      ),
    }),

    columnHelper.accessor("longitude", {
      header: "Longitude",
      cell: (props) => <InputCell {...props} min={-180} max={180} />,
    }),

    columnHelper.accessor("latitude", {
      header: "Latitude",
      cell: (props) => <InputCell {...props} min={-90} max={90} />,
    }),

    columnHelper.accessor("elevation", {
      header: "Elevation",
      cell: (props) => <InputCell {...props} min={0} />,
    }),

    columnHelper.accessor("additional", {
      header: "Additional",
      cell: ({ getValue }) => {
        return (
          <AdditionalCell
            wireline={getValue()?.wireline}
            pason={getValue()?.pason}
            heatmap={getValue()?.heatmap}
          />
        );
      },
    }),
  ];

  const [data, setData] = React.useState(() => wells);

  const {
    getHeaderGroups,
    options,
    previousPage,
    getCanPreviousPage,
    nextPage,
    getCanNextPage,
    getPageCount,
    getState,
    setPageSize,
    getRowModel,
    setPageIndex,
    getIsSomeRowsSelected,
    getIsAllRowsSelected,
    resetRowSelection,
    getSelectedRowModel,
  } = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  React.useEffect(() => {
    setPageSize(5);
  }, []);

  return (
    <div>
      <table className={tableStyle}>
        <thead
          style={{ display: "table", width: "100%", tableLayout: "fixed" }}
        >
          <tr key={"header"}>
            <th className={tableHeadStyle}>
              <div style={{ display: "flex", gap: 5 }}>
                <FontAwesomeIcon
                  icon={faSave}
                  size="xl"
                  color={
                    getIsSomeRowsSelected() || getIsAllRowsSelected()
                      ? "#1B96FC"
                      : "#E6E8EC"
                  }
                />
                {(getIsSomeRowsSelected() || getIsAllRowsSelected()) && (
                  <button
                    onClick={() => {
                      const dataCopy = [...data];

                      getSelectedRowModel().rows.map((row) => {
                        dataCopy.splice(row.index, 1);
                      });

                      setData(dataCopy);
                      resetRowSelection();
                    }}
                  >
                    Delete
                  </button>
                )}
              </div>
            </th>
          </tr>
          {
            // Loop over the header rows
            getHeaderGroups().map((headerGroup) => (
              // Apply the header row props
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id} className={tableHeadStyle}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </th>
                ))}
              </tr>
            ))
          }
        </thead>

        <tbody
          style={{
            height: 300,
            display: "block",
            width: "100%",
            tableLayout: "fixed",
            overflow: "scroll",
          }}
        >
          {getRowModel().rows.map((row) => (
            <tr
              key={row.id}
              style={{ display: "table", width: "100%", tableLayout: "fixed" }}
            >
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <div
        style={{
          display: "flex",
          gap: 100,
          height: 20,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div style={{ display: "flex", gap: 5 }}>
          <button
            onClick={() => setPageIndex(0)}
            disabled={!getCanPreviousPage()}
          >
            {"<<"}
          </button>
          <button
            onClick={() => previousPage()}
            disabled={!getCanPreviousPage()}
          >
            {"<"}
          </button>
          <button onClick={() => nextPage()} disabled={!getCanNextPage()}>
            {">"}
          </button>
          <button
            onClick={() => setPageIndex(getPageCount() - 1)}
            disabled={!getCanNextPage()}
          >
            {">>"}
          </button>
        </div>

        <p>
          Page{" "}
          <strong>
            {getState().pagination.pageIndex + 1} of {getPageCount()}
          </strong>
        </p>
        <div>
          <select
            value={getState().pagination.pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
            }}
          >
            {[5, 10, 20].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </select>{" "}
          Rows
        </div>
      </div>
    </div>
  );
}

interface TagProps {
  name: string;
}

const Tag = ({ name }: TagProps) => {
  return <div className={tagStyle}>{name}</div>;
};

const ShowIcon = () => {
  const [show, setShow] = useState(true);

  return (
    <FontAwesomeIcon
      icon={show ? faToggleOn : faToggleOff}
      size="xl"
      color={show ? "#1B96FC" : "#E6E8EC"}
      onClick={() => setShow(!show)}
    />
  );
};

const Checkbox = ({
  indeterminate,
  className = "",
  ...rest
}: { indeterminate?: boolean } & HTMLProps<HTMLInputElement>) => {
  const ref = React.useRef<HTMLInputElement>(null!);

  React.useEffect(() => {
    if (typeof indeterminate === "boolean") {
      ref.current.indeterminate = !rest.checked && indeterminate;
    }
  }, [ref, indeterminate]);

  return (
    <input
      type="checkbox"
      ref={ref}
      className={className + " cursor-pointer"}
      {...rest}
    />
  );
};
