import XLSXPopulate from "xlsx-populate";
import { db } from "./database/connection.database.js";
import path from "path";

export async function createExcel() {
  try {
    console.log("📥 Generando archivo Excel...");

    // Ejecutar la consulta a la base de datos
    const result = await db.query(`
      SELECT 
        p.tuition AS "Tuition",  
        p.name AS "Name", 
        p.passenger_capacity AS "Passenger Capacity",
        p.flight_hours AS "Flight Hours",
        s.description AS "Status",
        m.description AS "Model"
      FROM plane p
      JOIN status_flight s ON p.id_status = s.id_status
      JOIN model_plane m ON p.id_model = m.id_model;
    `);

    const data = result.rows;
    if (data.length === 0) {
      console.log("⚠️ No hay datos disponibles para exportar.");
      return;
    }

    // Crear el archivo Excel
    const workbook = await XLSXPopulate.fromBlankAsync();
    const sheet = workbook.sheet(0); // Usar la hoja principal

    // Agregar encabezados
    const headers = Object.keys(data[0]);
    headers.forEach((header, i) => {
      sheet
        .cell(1, i + 1)
        .value(header)
        .style({ bold: true, fill: "yellow" });
    });

    // Agregar datos
    data.forEach((row, rowIndex) => {
      headers.forEach((header, colIndex) => {
        sheet.cell(rowIndex + 2, colIndex + 1).value(row[header]);
      });
    });

    // Guardar el archivo en la carpeta actual
    const filePath = path.resolve("planes.xlsx");
    await workbook.toFileAsync(filePath);

    console.log(`📂 Archivo Excel generado exitosamente: ${filePath}`);

    return filePath; // Devuelve la ruta del archivo si es necesario usarlo en una API
  } catch (error) {
    console.error("❌ Error al exportar a Excel:", error);
    return null; // Retorna null en caso de error
  }
}
