export function jsonToCsv(data: any[]): string {
  // Util function to convert a standard json obj to csv
  const csvRows: string[] = [];

  // Headers
  const headers = Object.keys(data[0]);
  csvRows.push(headers.join(","));

  // Rows
  for (const row of data) {
    const values = headers.map((header) => {
      let cellValue = row[header];
      if (typeof cellValue === "string" && cellValue.includes(",")) {
        cellValue = `"${cellValue}"`;
      }
      return cellValue;
    });
    csvRows.push(values.join(","));
  }

  return csvRows.join("\n");
}
