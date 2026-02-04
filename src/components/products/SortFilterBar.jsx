import { ArrowDownUp, SlidersHorizontal } from "lucide-react";

export default function SortFilterBar() {
  return (
    <section className="w-full border-y border-gray-200 bg-white mt-10">
      <div className="grid grid-cols-2">
        {/* SORT */}
        <div className="flex items-center gap-3 px-4 py-3 border-r border-gray-200">
          <ArrowDownUp className="w-5 h-5 text-gray-600" />
          <div>
            <p className="text-sm font-semibold text-gray-800">Sort By</p>
            <p className="text-xs text-gray-500">Newest Arrival</p>
          </div>
        </div>

        {/* FILTER */}
        <div className="flex items-center gap-3 px-4 py-3">
          <SlidersHorizontal className="w-5 h-5 text-gray-600" />
          <div>
            <p className="text-sm font-semibold text-gray-800">Filter</p>
            <p className="text-xs text-gray-500">Theme, Size, etc.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
