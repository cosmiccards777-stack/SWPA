'use client';

import React, { useState } from 'react';
import { X, Ruler, CheckCircle2 } from 'lucide-react';

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  productType?: string;
  productHandle?: string;
}

const WOMENS_CARGO_SIZES = [
  { size: 'XS', fitCm: '63–67 cm', fitIn: '24.8–26.4"', actualCm: '74 cm', actualIn: '29.1"' },
  { size: 'S', fitCm: '68–72 cm', fitIn: '26.8–28.3"', actualCm: '79 cm', actualIn: '31.1"' },
  { size: 'M', fitCm: '74–79 cm', fitIn: '29.1–31.1"', actualCm: '84 cm', actualIn: '33.1"' },
  { size: 'L', fitCm: '81–86 cm', fitIn: '31.9–33.9"', actualCm: '89 cm', actualIn: '35.0"' },
  { size: 'XL', fitCm: '89–94 cm', fitIn: '35.0–37.0"', actualCm: '94 cm', actualIn: '37.0"' },
  { size: '2XL', fitCm: '96–101 cm', fitIn: '37.8–39.8"', actualCm: '99 cm', actualIn: '39.0"' },
  { size: '3XL', fitCm: '105–109 cm', fitIn: '41.3–42.9"', actualCm: '104 cm', actualIn: '40.9"' },
  { size: '4XL', fitCm: '113–116 cm', fitIn: '44.5–45.7"', actualCm: '111 cm', actualIn: '43.7"' },
  { size: '5XL', fitCm: '121–124 cm', fitIn: '47.6–48.8"', actualCm: '117 cm', actualIn: '46.1"' },
];

const MENS_CARGO_SIZES = [
  { size: 'S', fitIn: '31–33"', actualCm: '79–84 cm' },
  { size: 'M', fitIn: '34–35"', actualCm: '86–89 cm' },
  { size: 'L', fitIn: '36–38"', actualCm: '91–96 cm' },
  { size: 'XL', fitIn: '39–40"', actualCm: '99–101 cm' },
  { size: '2XL', fitIn: '41–42"', actualCm: '104–107 cm' },
  { size: '3XL', fitIn: '43–44"', actualCm: '110–114 cm' },
];

export default function SizeGuideModal({
  isOpen,
  onClose,
  productType = 'Hoodies',
  productHandle = '',
}: SizeGuideModalProps) {
  const isWomensCargo = productHandle === 'womens-plain-black-stretch-cargo-trousers';
  const isMensCargo = productHandle === 'mens-plain-black-stretch-cargo-trousers';
  const isCargo = isWomensCargo || isMensCargo;
  const [unit, setUnit] = useState<'inches' | 'cm'>(isWomensCargo ? 'cm' : 'inches');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />

      <div className="relative bg-[#11141c] border border-gray-800 rounded-2xl max-w-2xl w-full p-6 text-white shadow-2xl z-10">
        <div className="flex items-center justify-between pb-4 border-b border-gray-800">
          <div className="flex items-center gap-2.5">
            <Ruler className="w-5 h-5 text-amber-400" />
            <h3 className="text-lg font-black uppercase tracking-wider font-display">
              Official Size Guide &amp; Fit
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-white rounded-lg hover:bg-gray-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <span className="text-xs text-gray-400 uppercase tracking-wider font-semibold">
            Garment:{' '}
            <strong className="text-white">
              {isWomensCargo
                ? "Women's Stretch Cargo Trousers"
                : isMensCargo
                ? "Men's Stretch Cargo Trousers"
                : productType}
            </strong>{' '}
            (Standard UK Fit)
          </span>
          {!isMensCargo && (
            <div className="flex bg-gray-900 border border-gray-800 rounded-lg p-0.5 text-xs font-bold">
              <button
                onClick={() => setUnit('inches')}
                className={`px-3 py-1 rounded-md transition-colors ${
                  unit === 'inches' ? 'bg-amber-400 text-black' : 'text-gray-400 hover:text-white'
                }`}
              >
                Inches
              </button>
              <button
                onClick={() => setUnit('cm')}
                className={`px-3 py-1 rounded-md transition-colors ${
                  unit === 'cm' ? 'bg-amber-400 text-black' : 'text-gray-400 hover:text-white'
                }`}
              >
                CM
              </button>
            </div>
          )}
        </div>

        {/* Size Table */}
        <div className="mt-4 overflow-x-auto">
          {isWomensCargo ? (
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-gray-800 text-gray-400 uppercase tracking-wider">
                  <th className="py-2.5 px-3">Size</th>
                  <th className="py-2.5 px-3">Waist to Fit ({unit})</th>
                  <th className="py-2.5 px-3">Waist Actual ({unit})</th>
                  <th className="py-2.5 px-3">Inside Leg</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800/60 font-medium text-gray-300">
                {WOMENS_CARGO_SIZES.map((row) => (
                  <tr key={row.size}>
                    <td className="py-2 px-3 font-bold text-amber-400">{row.size}</td>
                    <td className="py-2 px-3">{unit === 'cm' ? row.fitCm : row.fitIn}</td>
                    <td className="py-2 px-3">{unit === 'cm' ? row.actualCm : row.actualIn}</td>
                    <td className="py-2 px-3 text-gray-400">{unit === 'cm' ? '74 cm' : '29.1"'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : isMensCargo ? (
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-gray-800 text-gray-400 uppercase tracking-wider">
                  <th className="py-2.5 px-3">Size</th>
                  <th className="py-2.5 px-3">Waist to Fit (Inches)</th>
                  <th className="py-2.5 px-3">Waist Actual (CM)</th>
                  <th className="py-2.5 px-3">Leg Length</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800/60 font-medium text-gray-300">
                {MENS_CARGO_SIZES.map((row) => (
                  <tr key={row.size}>
                    <td className="py-2 px-3 font-bold text-amber-400">{row.size}</td>
                    <td className="py-2 px-3">{row.fitIn}</td>
                    <td className="py-2 px-3">{row.actualCm}</td>
                    <td className="py-2 px-3 text-gray-400">Regular: 75 cm / Long: 86 cm</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-gray-800 text-gray-400 uppercase tracking-wider">
                  <th className="py-2.5 px-3">Size</th>
                  <th className="py-2.5 px-3">To Fit Chest ({unit})</th>
                  <th className="py-2.5 px-3">Length ({unit})</th>
                  <th className="py-2.5 px-3">UK Typical</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800/60 font-medium text-gray-300">
                <tr>
                  <td className="py-2 px-3 font-bold text-amber-400">XS</td>
                  <td className="py-2 px-3">{unit === 'inches' ? '34"' : '86 cm'}</td>
                  <td className="py-2 px-3">{unit === 'inches' ? '26"' : '66 cm'}</td>
                  <td className="py-2 px-3 text-gray-400">UK 34</td>
                </tr>
                <tr>
                  <td className="py-2 px-3 font-bold text-amber-400">S</td>
                  <td className="py-2 px-3">{unit === 'inches' ? '36"' : '91 cm'}</td>
                  <td className="py-2 px-3">{unit === 'inches' ? '27"' : '68 cm'}</td>
                  <td className="py-2 px-3 text-gray-400">UK 36</td>
                </tr>
                <tr>
                  <td className="py-2 px-3 font-bold text-amber-400">M</td>
                  <td className="py-2 px-3">{unit === 'inches' ? '40"' : '101 cm'}</td>
                  <td className="py-2 px-3">{unit === 'inches' ? '28"' : '71 cm'}</td>
                  <td className="py-2 px-3 text-gray-400">UK 40</td>
                </tr>
                <tr>
                  <td className="py-2 px-3 font-bold text-amber-400">L</td>
                  <td className="py-2 px-3">{unit === 'inches' ? '44"' : '112 cm'}</td>
                  <td className="py-2 px-3">{unit === 'inches' ? '29"' : '74 cm'}</td>
                  <td className="py-2 px-3 text-gray-400">UK 44</td>
                </tr>
                <tr>
                  <td className="py-2 px-3 font-bold text-amber-400">XL</td>
                  <td className="py-2 px-3">{unit === 'inches' ? '48"' : '122 cm'}</td>
                  <td className="py-2 px-3">{unit === 'inches' ? '30"' : '76 cm'}</td>
                  <td className="py-2 px-3 text-gray-400">UK 48</td>
                </tr>
                <tr>
                  <td className="py-2 px-3 font-bold text-amber-400">2XL</td>
                  <td className="py-2 px-3">{unit === 'inches' ? '52"' : '132 cm'}</td>
                  <td className="py-2 px-3">{unit === 'inches' ? '31"' : '79 cm'}</td>
                  <td className="py-2 px-3 text-gray-400">UK 52</td>
                </tr>
                <tr>
                  <td className="py-2 px-3 font-bold text-amber-400">3XL</td>
                  <td className="py-2 px-3">{unit === 'inches' ? '56"' : '142 cm'}</td>
                  <td className="py-2 px-3">{unit === 'inches' ? '32"' : '81 cm'}</td>
                  <td className="py-2 px-3 text-gray-400">UK 56</td>
                </tr>
              </tbody>
            </table>
          )}
        </div>

        {/* Fitting recommendations */}
        <div className="mt-5 p-3.5 rounded-xl bg-gray-900/80 border border-gray-800 space-y-2 text-xs text-gray-400">
          {isCargo ? (
            <>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <p>
                  <strong className="text-white">Fit Advice:</strong> Regular workwear fit with breathable four-way stretch and drawcord waistband. Garment sizes are approximate and for guidance only.
                </p>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <p>
                  <strong className="text-white">Care Instructions:</strong> Wash at 30°C. Do not tumble dry. Do not iron.
                </p>
              </div>
            </>
          ) : (
            <>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <p>
                  <strong className="text-white">Fit Advice:</strong> All hoodies fit true to size. For an oversized streetwear aesthetic, order one size larger.
                </p>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <p>
                  <strong className="text-white">Care Instructions:</strong> Machine wash cold (30°C) inside out with like colors. Do not iron directly on embroidered crests or prints.
                </p>
              </div>
            </>
          )}
        </div>

        <div className="mt-5 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-amber-400 hover:bg-amber-300 text-black font-bold text-xs uppercase rounded-lg transition-colors"
          >
            Got It
          </button>
        </div>
      </div>
    </div>
  );
}
