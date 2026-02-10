export default function CoreFeatures({ activeTab }) {
  return (
    <section className="bg-white px-4 py-10 space-y-10">
      {/* TOP FEATURE BANNER */}
      {/* TOP FEATURE IMAGE ONLY */}
      {/* TOP FEATURE IMAGE ONLY */}
      <div className="mx-auto max-w-[400px]">
        <img
          src={
            activeTab === "women" ? "/img/women-core.jpeg" : "/img/core.jpeg"
          }
          alt="Featured"
          className="block w-full h-auto object-contain"
        />
      </div>
      {/* IMAGE COLLAGE */}
      {/* IMAGE COLLAGE */}
      <div className="space-y-4">
        {/* TOP ROW */}
        <div className="grid grid-cols-2 gap-4">
          <img
            src={
              activeTab === "women"
                ? "/img/women-halfsleeve.jpeg"
                : "/img/halfsleeve.jpeg"
            }
            className="object-cover h-[260px] w-full"
          />

          <div className="grid grid-rows-2 gap-4">
            <img
              src={
                activeTab === "women"
                  ? "/img/women-core42.jpeg"
                  : "/img/core42.jpeg"
              }
              className="object-cover h-full w-full"
            />

            <img
              src={
                activeTab === "women"
                  ? "/img/women-core52.jpeg"
                  : "/img/core52.jpeg"
              }
              className="object-cover h-full w-full"
            />
          </div>
        </div>

        {/* BOTTOM ROW — THIS IS THE IMPORTANT PART */}
        <div className="grid grid-cols-4 gap-4">
          {/* BIG IMAGE */}
          <img
            src={
              activeTab === "women"
                ? "/img/women-core22.jpeg"
                : "/img/core22.jpeg"
            }
            className="col-span-2 h-[120px] w-full object-cover"
          />

          {/* SMALL IMAGE 1 */}
          <img
            src={
              activeTab === "women"
                ? "/img/women-core3.jpeg"
                : "/img/core3.jpeg"
            }
            className="h-[120px] w-full object-cover"
          />

          {/* SMALL IMAGE 2 */}
          <img
            src={
              activeTab === "women"
                ? "/img/women-cordyroy.jpeg"
                : "/img/cordyroy.jpeg"
            }
            className="h-[120px] w-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}
