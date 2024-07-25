const gridStyle = (obj: any, data: any, isFullScreen: boolean) => {
    const { rowspan, colspan, row, col } = obj;
    const { rows, columns } = data;
    const chartHeight = (rowspan * (100 - 1)) / rows;
    const chartWidth = (colspan * 100) / columns;
    const yAxis = (row * (100 - 1)) / rows;
    const xAxis = (col * 100) / columns;
    return isFullScreen ? {
        position: 'fixed',
        top: '0',
        left: '0',
        zIndex: 100,
        height: `calc(100vh - 20px)`,
        width: `calc(100vw - 20px)`,
        margin: '10px',
    }
        : {
            position: 'absolute',
            height: `calc(${chartHeight}% - 4px)`,
            width: `calc(${chartWidth}% - 4px)`,
            left: `calc(${xAxis}% + 2px)`,
            top: `calc(${yAxis}% + 2px)`,
            zIndex: 0,
            margin: 0,
        };
}

export default gridStyle;