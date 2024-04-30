"use client";
import React, { useState, useEffect } from "react";

const Me = () => {
  const [titikSaatIni, mengaturTitikSaatIni] = useState(0);
  const [animasiGeser, mengaturAnimasiGeser] = useState(false);
  const [sentuhX, mengaturSentuhX] = useState(0);

  const gambar = [
    {
      foto: "https://fastly.picsum.photos/id/741/500/500.jpg?hmac=QxgEVGp1dAJW9qBYyKqxns1xKcymqoc16utopq1Osck",
      judul: "LIFE IS CODE",
    },

    {
      foto: "https://fastly.picsum.photos/id/468/500/500.jpg?hmac=HyiMmiWqLT84T6ekFJ7STK5l1yFF45gSkaafBtFQcyc",
      judul: "CREATIVITY IS A SKILL",
    },
  ];
  const latarBelakang = ["/bg/bg1.jpg", "/bg/bg2.jpg"];

  useEffect(() => {
    const waktuPerubahan = setInterval(() => {
      const perubahanAnimasi = (titikSaatIni + 1) % gambar.length;
      mengaturAnimasiGeser(true);
      setTimeout(() => {
        mengaturTitikSaatIni(perubahanAnimasi);
        mengaturAnimasiGeser(false);
      }, 500);
    }, 5000);

    const navigasiKeyboard = (klik: { key: string }) => {
      if (klik.key === "ArrowLeft" && titikSaatIni !== 0) {
        const sebelumnya =
          titikSaatIni === 0 ? gambar.length - 1 : titikSaatIni - 1;
        gantiGambar(sebelumnya);
      } else if (
        klik.key === "ArrowRight" &&
        titikSaatIni !== gambar.length - 1
      ) {
        const selanjutnya = (titikSaatIni + 1) % gambar.length;
        gantiGambar(selanjutnya);
      }
    };

    document.addEventListener("keydown", navigasiKeyboard);

    return () => {
      clearInterval(waktuPerubahan);
      document.removeEventListener("keydown", navigasiKeyboard);
    };
  }, [titikSaatIni, gambar.length]);

  const gantiGambar = (konten: React.SetStateAction<number>) => {
    mengaturAnimasiGeser(true);
    setTimeout(() => {
      mengaturTitikSaatIni(konten);
      mengaturAnimasiGeser(false);
    }, 500);
  };

  const sentuhanDimulai = (menggeser: React.TouchEvent<HTMLDivElement>) => {
    mengaturSentuhX(menggeser.touches[0].clientX);
  };

  const sentuhanBerpindah = (perubahan: React.TouchEvent<HTMLDivElement>) => {
    const sentuhAkhirX = perubahan.touches[0].clientX;
    const perbedaanX = sentuhAkhirX - sentuhX;

    if (Math.abs(perbedaanX) > 50) {
      if (perbedaanX > 0 && titikSaatIni !== 0) {
        const indexSebelumnya =
          titikSaatIni === 0 ? gambar.length - 1 : titikSaatIni - 1;
        gantiGambar(indexSebelumnya);
      } else if (perbedaanX < 0 && titikSaatIni !== gambar.length - 1) {
        const indexSelanjutnya = (titikSaatIni + 1) % gambar.length;
        gantiGambar(indexSelanjutnya);
      }
    }
  };

  return (
    <div className="flex items-center justify-center pb-4 md:pb-6 lg:pb-0">
      <div
        className="flex items-center justify-center relative"
        onTouchStart={sentuhanDimulai}
        onTouchMove={sentuhanBerpindah}
      >
        <div
          className={`absolute -left-4 md:-left-14 lg:-left-16 transition-transform duration-500 ${
            animasiGeser ? "-translate-x-2 md:-translate-x-4" : "translate-x-0"
          }`}
        >
          <div className="block md:hidden">
            <div className="w-[320px] h-[320px] relative flex items-start">
              <img
                src={gambar[titikSaatIni].foto}
                alt="me"
                className="object-cover w-[320px] h-[320px]"
              />
              <div className="absolute -top-5 left-5">
                <div className="p-2 bg-black rounded-lg max-w-[200px]">
                  <p className="text-white text-center text-xl font-pertama font-bold">
                    {gambar[titikSaatIni].judul}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="hidden md:block">
            <div className="w-full h-full relative">
              <img
                src={gambar[titikSaatIni].foto}
                alt="me"
                className="object-cover w-full h-full"
              />
              <div className="absolute -left-20 bottom-10">
                <div className="p-2 bg-black rounded-lg max-w-[260px]">
                  <p className="text-white text-center text-2xl font-pertama font-bold">
                    {gambar[titikSaatIni].judul}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          className={`relative -z-10 -right-4 md:-right-14 lg:-right-16 transition-transform duration-500 ${
            animasiGeser ? "translate-x-2 md:translate-x-4" : "-translate-x-0"
          }`}
        >
          <div className="w-[300px] h-[380px] md:w-[400px] md:h-[550px]">
            <img
              src={latarBelakang[titikSaatIni]}
              alt="Background"
              className="object-cover w-full h-full"
            />
          </div>
        </div>

        <div className="absolute -bottom-8 xl:-bottom-2 xl:-left-10 flex items-center justify-center gap-2">
          {gambar.map((_, titik) => (
            <div
              key={titik}
              className={`rounded-full cursor-pointer ${
                titik === titikSaatIni
                  ? "p-2 lg:p-2.5 border border-black"
                  : "p-2 lg:p-2.5"
              }`}
              onClick={() => gantiGambar(titik)}
            >
              <div className="w-2 h-2 bg-black rounded-full"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Me;
