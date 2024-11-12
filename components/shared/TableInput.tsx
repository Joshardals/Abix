import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"; // Imports table components from a UI library or custom components.
import { formatDate, formatPrice } from "@/lib/utils"; // Imports utility functions to format dates and prices.
interface TableProps {
  caption?: string; // Optional caption for the table.
  header: string[]; // Array of strings for the table headers.
  tickets?: any[]; // Optional array of ticket objects to be displayed in the table.
}

export function TableInput(data: TableProps) {
  return (
    <Table className={`bg-black/10 rounded-lg max-sm:w-[35rem]`}>
      {/* Table component with background color and rounded corners. Responsive width for small screens. */}

      <TableCaption className="text-black/50">
        A list of your purchased tickets
      </TableCaption>
      {/* Table caption for providing additional information about the table. Styled with a grayish color. */}

      <TableHeader>
        {/* TableHeader component to define the header section of the table. */}
        <TableRow>
          {data.header.map((headerItem, index) => {
            return (
              <TableHead
                key={index}
                className={`font-semibold ${index === 0 && "w-[100px]"}
                  ${headerItem === "Amount" && "text-right"}`}
              >
                {headerItem}
              </TableHead>
            );
          })}
        </TableRow>
      </TableHeader>

      <TableBody>
        {/* TableBody component to define the body section of the table. */}
        {data.tickets?.map((ticket, index) => (
          <TableRow key={index} className="hover:bg-black/10">
            {/* TableRow component for each row of the table. Hover effect for visual feedback. */}
            <TableCell>{ticket.ticketId}</TableCell>
            {/* TableCell component to display the ticket ID. */}
            <TableCell>{ticket.from}</TableCell>
            {/* TableCell component to display the event name. */}
            <TableCell>{ticket.to}</TableCell>
            {/* TableCell component to display the status of the ticket. */}
            <TableCell className="w-[fit-content]">
              {formatDate(ticket.purchaseDate)}
            </TableCell>
            {/* TableCell component to display the purchase date formatted with `formatDate` utility function. */}
            <TableCell>{formatPrice(ticket.price)}</TableCell>
            {/* TableCell component to display the price formatted with `formatPrice` utility function. */}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
