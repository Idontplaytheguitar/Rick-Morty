type PaginationProps = {
    currentPage: number;
    totalPages: number;
    onPageChange: (newPageNumber: number) => void;
};

function Pagination({
    currentPage,
    totalPages,
    onPageChange,
}: PaginationProps) {
    return (
        <div className="flex justify-center">
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`${currentPage === 1 ? "opacity-50" : ""}`}
            >
                Previous
            </button>
            <span className="px-2">{currentPage}</span>
            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`${currentPage === totalPages ? "opacity-5" : ""}`}
            >
                Next
            </button>
        </div>
    );
}

export default Pagination;
