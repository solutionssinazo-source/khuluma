import { supabase } from "@/lib/supabaseClient";

export const revalidate = 3600; // refresh hourly — resource lists don't change often

export default async function ResourcesPage() {
  const { data: resources } = await supabase
    .from("resources")
    .select("*")
    .eq("verified", true)
    .order("category");

  const grouped = (resources ?? []).reduce<Record<string, typeof resources>>((acc, r) => {
    acc[r.category] = acc[r.category] ? [...acc[r.category], r] : [r];
    return acc;
  }, {});

  return (
    <main className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4" style={{ color: "#00311E" }}>
        Verified Support Resources
      </h1>
      {Object.entries(grouped).map(([category, items]) => (
        <section key={category} className="mb-6">
          <h2 className="text-lg font-semibold mb-2" style={{ color: "#00311E" }}>
            {category}
          </h2>
          {items!.map((r) => (
            <div key={r.id} className="border-b py-2">
              <p className="font-medium">{r.name}</p>
              {r.phone && <p className="text-sm text-gray-600">{r.phone}</p>}
              {r.notes && <p className="text-sm text-gray-500">{r.notes}</p>}
            </div>
          ))}
        </section>
      ))}
    </main>
  );
}
