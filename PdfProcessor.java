package managemnt;
import java.awt.Graphics;
import java.awt.Graphics2D;
import java.awt.print.PageFormat;
import java.awt.print.PrinterException;
import java.awt.print.PrinterJob;
import java.awt.print.Printable;
import java.io.IOException;

public class PdfProcessor {

    public static void main(String[] args) {
        String title = "Sample eBook Title";
        String description = "This is the description of the eBook.";

        // Call the method to generate the PDF
        try {
            generatePdf(title, description);
        } catch (IOException | PrinterException e) {
            e.printStackTrace();
        }
    }

    public static void generatePdf(String title, String description) throws IOException, PrinterException {
        // Create a PrinterJob instance
        PrinterJob printerJob = PrinterJob.getPrinterJob();

        // Create a Printable object to define how the content will be rendered
        Printable printable = new Printable() {
            @Override
            public int print(Graphics graphics, PageFormat pageFormat, int pageIndex) throws PrinterException {
                if (pageIndex > 0) {
                    return NO_SUCH_PAGE; // We only have one page for this example
                }

                // Cast Graphics object to Graphics2D to get more control over the drawing
                Graphics2D g2d = (Graphics2D) graphics;

                // Set up the graphics context (e.g., font, color, etc.)
                g2d.setFont(g2d.getFont().deriveFont(12f)); // Set font size
                g2d.drawString("eBook Title: " + title, 100, 100);
                g2d.drawString("Description: " + description, 100, 150);

                return PAGE_EXISTS; // Indicate that the page was successfully printed
            }
        };

        // Set the printable to the printer job
        printerJob.setPrintable(printable);

        // Set the page format (optional customization)
        PageFormat pageFormat = printerJob.defaultPage();
        pageFormat.setOrientation(PageFormat.PORTRAIT);

        // Print the document (this will trigger the printable object's print method)
        if (printerJob.printDialog()) {  // This shows a dialog before printing
            printerJob.print(); // Execute the print operation
        }

        System.out.println("PDF generation process initiated. If using a PDF printer, the file will be saved.");
    }
}
