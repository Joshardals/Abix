import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Avatar() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="rounded-full">
        <div className="text-navyBlue relative bg-yellow hover:bg-yellow/70 size-9 cursor-pointer flex items-center justify-center rounded-full hover-effects">
          JG
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem className="cursor-pointer">Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
