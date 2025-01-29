import { TMeta } from "@/types";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./ui/button";

export default function Pagination({
  metaData,
  setPage,
}: {
  metaData: TMeta;
  setPage: (value: number) => void;
}) {
  const currentPage = metaData.page;
  const totalPages = metaData.totalPage;

  console.log("metaData ", metaData);

  const handlePageChange = (pageNum: number) => {
    console.log("pageNum ", pageNum);
    if (pageNum > 0) {
      setPage(Number(pageNum));
    }
  };

  return (
    <>
      <div className="max-w-min space-x-2 flex  justify-end items-center">
        <Button
          variant="outline"
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <div className="flex space-x-2">
          {Array.from({ length: totalPages }, (_, index) => (
            <Button
              key={index + 1}
              variant={currentPage === index + 1 ? "default" : "outline"}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </Button>
          ))}
        </div>
        <Button
          variant="outline"
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </>
  );
}
