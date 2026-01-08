"use client";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Pagination Component :
interface PaginationProps {
  currentPage: number;
  totalPages: number;
  windowSize?: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  windowSize = 5,
  onPageChange,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  let start = Math.max(1, currentPage - 2);
  let end = start + windowSize - 1;

  if (end > totalPages) {
    end = totalPages;
    start = Math.max(1, end - windowSize + 1);
  }

  const pages = [];
  for (let i = start; i <= end; i++) pages.push(i);

  return (
    <nav
      className="flex gap-1 items-center justify-center py-2"
      aria-label="Pagination"
    >
      {/* Prev */}
      <PaginationButton
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage <= 1}
      >
        <ChevronLeft size={16} />
        <span className="hidden sm:block"> Prev</span>
      </PaginationButton>

      <div
        className="
          flex gap-1 
          justify-center items-center 
          md:w-100
          "
      >
        {/* First page shortcut */}
        {start > 1 && (
          <>
            <PaginationButton
              isActive={currentPage === 1}
              onClick={() => onPageChange(1)}
              children={1}
            />
            <span className="fg-muted text-sm select-none">…</span>
          </>
        )}

        {/* Window pages */}
        {pages.map((page) => (
          <PaginationButton
            key={page}
            isActive={currentPage === page}
            onClick={() => onPageChange(page)}
            children={page}
          />
        ))}

        {/* Last page shortcut */}
        {end < totalPages && (
          <>
            <span className="fg-muted text-sm select-none">…</span>
            <PaginationButton
              isActive={currentPage === totalPages}
              onClick={() => onPageChange(totalPages)}
              children={totalPages}
            />
          </>
        )}
      </div>
      {/* Next */}
      <PaginationButton
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
      >
        <span className="hidden sm:block">Next </span>
        <ChevronRight size={16} />
      </PaginationButton>
    </nav>
  );
}

// Pagination Button Component :
interface PaginationButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  isActive?: boolean;
  onClick: () => void;
}

function PaginationButton({
  children,
  isActive = false,
  onClick,
  ...props
}: PaginationButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`
        flex items-center justify-center
        bg-card hover-card 
        border border-default 
        rounded-md cursor-pointer
        md:text-sm text-xs 
        md:h-9 h-7 
        md:min-w-9 min-w-7 px-2
        disabled:opacity-40 disabled:cursor-not-allowed 
        ${isActive ? "fg-primary border-lighter" : "fg-muted"}
      `}
      aria-current={isActive ? "page" : undefined}
      {...props}
    >
      {children}
    </button>
  );
}
