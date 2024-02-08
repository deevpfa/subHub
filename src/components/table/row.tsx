import React from "react";

interface TableRowProps extends React.HTMLProps<HTMLTableRowElement> {}

class TableRow extends React.Component<TableRowProps> {
    render() { 
        return (
            <tr {...this.props} />
        );
    }
}

export default TableRow;