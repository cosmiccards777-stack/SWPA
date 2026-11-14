'use client';

import React, { useState } from 'react';
import { X, Ruler, CheckCircle2 } from 'lucide-react';

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  productType?: string;
}

export default function SizeGuideModal({ isOpen, onClose, productType = 'Hoodies' }: SizeGuideModalProps) {
  const [unit, setUnit] = useState<'inches' | 'cm'>('inches');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />

      <div className="relative bg-[#11141c] border border-gray-800 rounded-2xl max-w-2xl w-full p-6 text-white shadow-2xl z-10">
        <div className="flex items-center justify-between pb-4 border-b border-gray-800">
          <div className="flex items-center gap-2.5">
            <Ruler className="w-5 h-5 text-amber-400" />
            <h3 className="text-lg font-black uppercase tracking-wider font-display">
              Official Size Guide & Fit
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
            Garment: <strong className="text-white">{productType}</strong> (Standard UK Fit)
          </span>
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
        </div>

        {/* Size Table */}
        <div className="mt-4 overflow-x-auto">
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
        </div>

        {/* Fitting recommendations */}
        <div className="mt-5 p-3.5 rounded-xl bg-gray-900/80 border border-gray-800 space-y-2 text-xs text-gray-400">
          <div className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
            <span>
              <strong>Fit Advice:</strong> All hoodies and sweatshirts fit true to size. For an oversized streetwear aesthetic, order one size larger.
            </span>
          </div>
          <div className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
            <span>
              <strong>Care Instructions:</strong> Machine wash cold (30°C) inside out with like colors. Do not iron directly on embroidered crests or prints.
            </span>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="bg-amber-400 hover:bg-amber-300 text-black font-extrabold uppercase tracking-wider text-xs px-6 py-2.5 rounded-lg transition-colors"
          >
            Got It
          </button>
        </div>
      </div>
    </div>
  );
}
