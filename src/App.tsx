import { useState } from "react";
import { ComboboxDemo } from "./components/Combobox";
import CryptoTable from "./components/CryptoTable";
import { Label } from "./components/ui/label";
import { Providers } from "./redux/provider"
import { Toaster } from "react-hot-toast";

const filterOptions = [
  {
    value: "all",
    label: "All",
  },
  {
    value: "topgainer",
    label: "Top Gainer",
  },
  {
    value: "toploser",
    label: "Top Loser",
  },
  {
    value: "highestvolume",
    label: "Highest Volume",
  },
  {
    value: "saved",
    label: "Saved",
  },
]

export default function App() {
  const [filter, setFilter] = useState("all");

  const handleSetFilter = (Filter: string) => {
    setFilter(Filter);
  }
  return (
    <main className="min-h-screen p-4 md:p-8">
      <Toaster
        position="bottom-center"
      />
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Cryptocurrency Prices</h1>
        <Providers>
          <div className="mb-4 flex items-center gap-2">
            <Label>Filter</Label>
            <ComboboxDemo value={filter} setValue={handleSetFilter} options={filterOptions} />
          </div>
          <CryptoTable filter={filter} />
        </Providers>
      </div>
    </main>
  )
}
