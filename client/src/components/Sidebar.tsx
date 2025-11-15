import { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import Card from "./Card";
import { Link } from "react-router-dom";

interface Item {
    label: string;
    path: string;
    id: string | number;
}

export default function Sidebar({items}: { items: Item[] }) {
    const [openProduct, setOpenProduct] = useState(false);
    return (
        <aside className="h-full text-sm w-[260px] min-w-[200px] bg-slate-50 p-2 border-r border-gray-200">
            <nav className="space-y-3">
                
                <SubItem label="Dashboard" path="/" />

                <div>
                    <Card className={"flex justify-between"}>
                        
                        <button
                            className="flex items-center justify-between hover:text-gray-900 w-full px-2 py-3 cursor-pointer"
                            onClick={() => setOpenProduct(!openProduct)}
                        >
                            <div className="flex items-center gap-2">
                                <span>Product</span>
                            </div>
                            {openProduct ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                        </button>
                    </Card>

                    {openProduct && (
                        <div className="ml-4 mt-1 space-y-1">
                            {
                                items.map((item) => (
                                <SubItem key={item.id} path={item.path} label={item.label} />
                                ))
                            }
                        </div>
                    )}
                </div>

                <Item label="Emails" badge={8} />
            </nav>
        </aside>
    );
}

function Item({ label, badge }: { label: string; badge?: number }) {
  return (
    <div className="flex items-center justify-between py-2 hover:text-gray-900 cursor-pointer">
      <span>{label}</span>
      {badge !== undefined && (
        <span className="bg-pink-500 text-white text-xs px-2 py-0.5 rounded-full">
          {badge}
        </span>
      )}
    </div>
  );
}

function SubItem({ label, path }: { label: string, path: string }) {
  return (
    <div className="py-1 cursor-pointer hover:text-gray-900">
        <Link to={path}>{label}</Link>
    </div>
  );
}
