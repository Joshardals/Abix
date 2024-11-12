import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDate, formatPrice } from "@/lib/utils";

interface Ticket {
  ticketId: string;
  from: string;
  to: string;
  purchaseDate: string;
  price: number;
}

interface TableProps {
  caption?: string;
  header: string[];
  tickets?: Ticket[];
}

export function TableInput(data: TableProps) {
  return (
    <Table className="bg-black/10 rounded-lg max-sm:w-[35rem]">
      <TableCaption className="text-black/50">
        A list of your purchased tickets
      </TableCaption>

      <TableHeader>
        <TableRow>
          {data.header.map((headerItem, index) => (
            <TableHead
              key={index}
              className={`font-semibold ${index === 0 && "w-[100px]"} ${
                headerItem === "Amount" && "text-right"
              }`}
            >
              {headerItem}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>

      <TableBody>
        {data.tickets?.map((ticket, index) => (
          <TableRow key={index} className="hover:bg-black/10">
            <TableCell>{ticket.ticketId}</TableCell>
            <TableCell>{ticket.from}</TableCell>
            <TableCell>{ticket.to}</TableCell>
            <TableCell className="w-[fit-content]">
              {formatDate(ticket.purchaseDate)}
            </TableCell>
            <TableCell>{formatPrice(ticket.price)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
