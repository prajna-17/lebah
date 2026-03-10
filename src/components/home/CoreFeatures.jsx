export default function CoreFeatures({ activeTab }) {
  return (
    <>
      <style>{`
        @media (min-width: 768px) {
          .cf-section {
            background: linear-gradient(160deg, #fdfaf5 0%, #f7f0e6 60%, #fdfaf5 100%);
            padding: 56px 64px 64px !important;
            position: relative;
          }
          .cf-section::before,
          .cf-section::after {
            content: '';
            position: absolute;
            left: 0; right: 0;
            height: 1px;
            background: linear-gradient(90deg, transparent, #c9a44c66, #c9a44caa, #c9a44c66, transparent);
            pointer-events: none;
          }
          .cf-section::before { top: 0; }
          .cf-section::after  { bottom: 0; }

          /* ← THE FIX: constrain content width and center it */
          .cf-inner {
            max-width: 980px;
            margin: 0 auto;
          }

          .cf-header {
            display: flex;
            flex-direction: column;
            align-items: center;
            margin-bottom: 40px;
          }
          .cf-eyebrow {
            font-size: 9px;
            font-weight: 500;
            letter-spacing: 0.38em;
            text-transform: uppercase;
            color: #c9a44c;
            margin-bottom: 6px;
          }
          .cf-headline {
            font-size: 28px;
            font-weight: 700;
            letter-spacing: -0.01em;
            color: #1a1208;
            margin-bottom: 10px;
          }
          .cf-divider {
            display: flex;
            align-items: center;
            gap: 10px;
          }
          .cf-divider span {
            width: 4px; height: 4px;
            background: #c9a44c;
            border-radius: 50%;
          }
          .cf-divider::before {
            content: '';
            width: 60px; height: 1px;
            background: linear-gradient(90deg, transparent, #c9a44c);
          }
          .cf-divider::after {
            content: '';
            width: 60px; height: 1px;
            background: linear-gradient(90deg, #c9a44c, transparent);
          }

          .cf-hero-wrap {
            max-width: 100% !important;
            position: relative;
            overflow: hidden;
            border-radius: 4px;
            margin-bottom: 20px;
            box-shadow: 0 4px 24px rgba(0,0,0,0.1), 0 0 0 1px rgba(201,164,76,0.2);
          }
          .cf-hero-wrap::before,
          .cf-hero-wrap::after {
            content: '';
            position: absolute;
            left: 0; right: 0;
            height: 2px;
            background: linear-gradient(90deg, transparent, #c9a44c, #f0d080, #c9a44c, transparent);
            z-index: 3;
            pointer-events: none;
          }
          .cf-hero-wrap::before { top: 0; }
          .cf-hero-wrap::after  { bottom: 0; }
          .cf-hero-wrap img {
            width: 100%;
            height: 420px !important;
            object-fit: cover !important;
            display: block;
            transition: transform 6s ease;
          }
          .cf-hero-wrap:hover img { transform: scale(1.03); }

          .cf-img-wrap {
            overflow: hidden;
            border-radius: 3px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.08), 0 0 0 1px rgba(201,164,76,0.12);
            transition: box-shadow 0.3s ease, transform 0.3s cubic-bezier(.2,.8,.3,1);
            position: relative;
          }
          .cf-img-wrap:hover {
            box-shadow: 0 10px 28px rgba(0,0,0,0.14), 0 0 0 1px rgba(201,164,76,0.38);
            transform: scale(1.015);
            z-index: 2;
          }
          .cf-img-wrap img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            display: block;
            transition: transform 5s ease;
          }
          .cf-img-wrap:hover img { transform: scale(1.06); }

          .cf-tall      { height: 360px !important; }
          .cf-half      { height: 170px !important; }
          .cf-bottom-lg { height: 180px !important; }
          .cf-bottom-sm { height: 180px !important; }

          .cf-top-row    { gap: 20px !important; }
          .cf-right-col  { gap: 20px !important; }
          .cf-bottom-row { gap: 20px !important; }
          .cf-collage    { gap: 20px !important; }

          .cf-hero-wrap { opacity: 0; animation: cfUp 0.5s ease 0.05s forwards; }
          .cf-collage   { opacity: 0; animation: cfUp 0.5s ease 0.18s forwards; }
          @keyframes cfUp {
            from { opacity: 0; transform: translateY(14px); }
            to   { opacity: 1; transform: translateY(0); }
          }
        }

        @media (max-width: 767px) {
          .cf-header { display: none !important; }
          .cf-inner  { display: contents; }
          .cf-hero-wrap {
            max-width: 400px !important;
            margin: 0 auto 20px auto !important;
            border-radius: 0 !important;
            box-shadow: none !important;
          }
          .cf-hero-wrap::before,
          .cf-hero-wrap::after { display: none !important; }
          .cf-hero-wrap img { height: auto !important; object-fit: contain !important; transition: none !important; }
          .cf-img-wrap { border-radius: 0 !important; box-shadow: none !important; transition: none !important; }
          .cf-img-wrap:hover { transform: none !important; box-shadow: none !important; }
          .cf-img-wrap img { transition: none !important; }
          .cf-img-wrap:hover img { transform: none !important; }
          .cf-tall      { height: 260px !important; }
          .cf-half      { height: unset !important; }
          .cf-bottom-lg { height: 120px !important; }
          .cf-bottom-sm { height: 120px !important; }
          .cf-top-row    { gap: 16px !important; }
          .cf-right-col  { gap: 16px !important; }
          .cf-bottom-row { gap: 16px !important; }
          .cf-collage    { gap: 16px !important; }
        }
      `}</style>

      <section className="cf-section bg-white px-4 py-10">
        {/* cf-inner: constrains width on desktop, invisible on mobile */}
        <div className="cf-inner space-y-10">
          {/* Desktop header */}
          <div className="cf-header" style={{ display: "none" }}>
            <span className="cf-eyebrow">Curated Looks</span>
            <span className="cf-headline">The Collection</span>
            <div className="cf-divider">
              <span />
            </div>
          </div>

          {/* HERO */}
          <div className="cf-hero-wrap mx-auto max-w-[400px]">
            <img
              src={activeTab === "women" ? "/img/new.jpg" : "/img/core.jpeg"}
              alt="Featured"
              className="block w-full h-auto object-contain"
            />
          </div>

          {/* COLLAGE */}
          <div className="cf-collage space-y-4">
            {/* TOP ROW */}
            <div className="cf-top-row grid grid-cols-2 gap-4">
              <div className="cf-img-wrap cf-tall">
                <img
                  src={
                    activeTab === "women"
                      ? "/img/c4.jpeg"
                      : "/img/halfsleeve.jpeg"
                  }
                  className="object-cover h-[260px] w-full"
                  alt=""
                />
              </div>
              <div className="cf-right-col grid grid-rows-2 gap-4">
                <div className="cf-img-wrap cf-half">
                  <img
                    src={
                      activeTab === "women"
                        ? "/img/c1.jpeg"
                        : "/img/core42.jpeg"
                    }
                    className="object-cover h-full w-full"
                    alt=""
                  />
                </div>
                <div className="cf-img-wrap cf-half">
                  <img
                    src={
                      activeTab === "women"
                        ? "/img/c2.jpeg"
                        : "/img/core52.jpeg"
                    }
                    className="object-cover h-full w-full"
                    alt=""
                  />
                </div>
              </div>
            </div>

            {/* BOTTOM ROW */}
            <div className="cf-bottom-row grid grid-cols-4 gap-4">
              <div className="cf-img-wrap cf-bottom-lg col-span-2">
                <img
                  src={
                    activeTab === "women" ? "/img/c3.jpeg" : "/img/core22.jpeg"
                  }
                  className="h-[120px] w-full object-cover"
                  alt=""
                />
              </div>
              <div className="cf-img-wrap cf-bottom-sm">
                <img
                  src={
                    activeTab === "women" ? "/img/c5.jpeg" : "/img/core3.jpeg"
                  }
                  className="h-[120px] w-full object-cover"
                  alt=""
                />
              </div>
              <div className="cf-img-wrap cf-bottom-sm">
                <img
                  src={
                    activeTab === "women"
                      ? "/img/c7.jpeg"
                      : "/img/cordyroy.jpeg"
                  }
                  className="h-[120px] w-full object-cover"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
