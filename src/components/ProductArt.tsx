import React, { useId, useState } from 'react';
import { Product } from '../types';

interface ProductArtProps {
  product: Product;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'hero';
}

export const ProductArt: React.FC<ProductArtProps> = ({
  product,
  className = '',
  size = 'md',
}) => {
  const [imgError, setImgError] = useState(false);
  const uid = useId().replace(/:/g, '_');
  const h = product.hue;
  const gradientId = `grad_${product.id}_${uid}`;
  const darkId = `dark_${product.id}_${uid}`;
  const glassId = `glass_${product.id}_${uid}`;

  if (product.image && !imgError) {
    const rawPath = product.image.startsWith('/') ? product.image : `/${product.image}`;
    const cleanSrc = encodeURI(rawPath);
    return (
      <div className={`relative w-full h-full overflow-hidden bg-stone-50 flex items-center justify-center ${className}`}>
        <img
          src={cleanSrc}
          alt={`${product.name} by ${product.brand} - Wholesale & Retail Vape (${product.nic !== '—' ? product.nic + ' Nicotine' : 'Authentic Device'})`}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-contain p-2 transition-transform duration-300 group-hover:scale-105"
          referrerPolicy="no-referrer"
          onError={() => setImgError(true)}
        />
      </div>
    );
  }

  // Rendering specialized vector art for each product category
  const renderCategoryArtwork = () => {
    switch (product.cat) {
      case 'disposables':
        return (
          <>
            {/* Soft ground shadow */}
            <ellipse cx="60" cy="108" rx="28" ry="4" fill={`hsl(${h}, 60%, 15%)`} opacity="0.25" />
            
            {/* Ergonomic Mouthpiece */}
            <rect x="49" y="10" width="22" height="18" rx="6" fill={`url(#${darkId})`} />
            <rect x="55" y="10" width="10" height="4" rx="2" fill="#fff" opacity="0.2" />
            
            {/* Main Device Chassis */}
            <rect x="38" y="24" width="44" height="80" rx="16" fill={`url(#${gradientId})`} />
            
            {/* Upper soft contrast band */}
            <rect x="38" y="24" width="44" height="18" rx="10" fill="#000" opacity="0.14" />
            
            {/* Specular high-gloss reflection highlight */}
            <rect x="43" y="30" width="5" height="66" rx="2.5" fill="#fff" opacity="0.35" />
            
            {/* Secondary edge rim light */}
            <rect x="74" y="32" width="2" height="62" rx="1" fill="#fff" opacity="0.2" />
            
            {/* OLED screen / Indicator bezel */}
            {product.id === 'lumen-15k' || product.id === 'flux-25k' ? (
              <g>
                <rect x="45" y="66" width="30" height="26" rx="6" fill="#120E22" stroke="rgba(255,255,255,0.15)" strokeWidth="0.8" />
                <rect x="48" y="70" width="12" height="3" rx="1.5" fill={`hsl(${h}, 95%, 75%)`} />
                <rect x="48" y="76" width="20" height="2" rx="1" fill="#45D4A6" opacity="0.9" />
                <circle cx="70" cy="84" r="2.5" fill={`hsl(${h}, 95%, 80%)`} />
              </g>
            ) : (
              /* USB-C / LED Indicator at bottom */
              <rect x="55" y="92" width="10" height="3" rx="1.5" fill="#fff" opacity="0.8" />
            )}
          </>
        );

      case 'eliquids':
        return (
          <>
            <ellipse cx="60" cy="110" rx="28" ry="4" fill={`hsl(${h}, 60%, 15%)`} opacity="0.22" />
            {/* Child-resistant cap */}
            <rect x="47" y="8" width="26" height="22" rx="4" fill={`url(#${darkId})`} />
            <line x1="50" y1="12" x2="50" y2="26" stroke="#fff" opacity="0.15" strokeWidth="1" />
            <line x1="54" y1="12" x2="54" y2="26" stroke="#fff" opacity="0.15" strokeWidth="1" />
            <line x1="58" y1="12" x2="58" y2="26" stroke="#fff" opacity="0.15" strokeWidth="1" />
            <line x1="62" y1="12" x2="62" y2="26" stroke="#fff" opacity="0.15" strokeWidth="1" />
            <line x1="66" y1="12" x2="66" y2="26" stroke="#fff" opacity="0.15" strokeWidth="1" />
            
            {/* Dropper neck */}
            <rect x="52" y="27" width="16" height="11" rx="2" fill={`hsl(${h}, 30%, 85%)`} />
            
            {/* Gorilla bottle translucent body */}
            <rect x="34" y="36" width="52" height="72" rx="12" fill={`url(#${gradientId})`} />
            
            {/* Matte printed label */}
            <rect x="39" y="52" width="42" height="38" rx="6" fill="#FFFFFF" opacity="0.95" />
            <rect x="44" y="60" width="30" height="4" rx="2" fill={`hsl(${h}, 65%, 45%)`} />
            <rect x="44" y="68" width="22" height="3" rx="1.5" fill={`hsl(${h}, 30%, 65%)`} />
            <rect x="44" y="75" width="14" height="3" rx="1.5" fill="#888" opacity="0.6" />
            
            {/* Cylindrical shine */}
            <rect x="38" y="40" width="5" height="64" rx="2.5" fill="#fff" opacity="0.35" />
          </>
        );

      case 'podkits':
        return (
          <>
            <ellipse cx="60" cy="110" rx="26" ry="4" fill={`hsl(${h}, 60%, 15%)`} opacity="0.22" />
            
            {/* Transparent Smoky Pod Cartridge */}
            <rect x="44" y="8" width="32" height="32" rx="10" fill={`hsl(${h}, 40%, 88%)`} opacity="0.85" />
            <rect x="49" y="14" width="22" height="20" rx="6" fill={`url(#${gradientId})`} opacity="0.5" />
            <line x1="60" y1="14" x2="60" y2="34" stroke="#fff" opacity="0.4" strokeWidth="1.5" />
            
            {/* Battery Mod Chassis */}
            <rect x="38" y="34" width="44" height="74" rx="18" fill={`url(#${gradientId})`} />
            
            {/* Tactile Firing Button */}
            <circle cx="60" cy="56" r="5" fill="#fff" opacity="0.9" />
            <circle cx="60" cy="56" r="3" fill={`hsl(${h}, 70%, 50%)`} />
            
            {/* Airflow slit & specular edge */}
            <rect x="42" y="42" width="4" height="56" rx="2" fill="#fff" opacity="0.4" />
            <rect x="54" y="94" width="12" height="3" rx="1.5" fill="#120E22" opacity="0.5" />
          </>
        );

      case 'pods':
        return (
          <>
            <ellipse cx="60" cy="104" rx="42" ry="4" fill={`hsl(${h}, 60%, 15%)`} opacity="0.2" />
            
            {/* Multi-pack pod arrangement */}
            <g fill={`url(#${gradientId})`}>
              <rect x="18" y="42" width="24" height="56" rx="10" />
              <rect x="48" y="30" width="24" height="68" rx="10" />
              <rect x="78" y="42" width="24" height="56" rx="10" />
            </g>
            
            {/* Pod view-windows */}
            <g fill="#fff" opacity="0.85">
              <rect x="23" y="54" width="14" height="16" rx="4" />
              <rect x="53" y="42" width="14" height="18" rx="4" />
              <rect x="83" y="54" width="14" height="16" rx="4" />
            </g>
            
            {/* Metallic Gold Contact Pins */}
            <circle cx="27" cy="94" r="2" fill="#F59E0B" />
            <circle cx="33" cy="94" r="2" fill="#F59E0B" />
            <circle cx="57" cy="94" r="2" fill="#F59E0B" />
            <circle cx="63" cy="94" r="2" fill="#F59E0B" />
            <circle cx="87" cy="94" r="2" fill="#F59E0B" />
            <circle cx="93" cy="94" r="2" fill="#F59E0B" />
          </>
        );

      case 'devices':
        return (
          <>
            <ellipse cx="60" cy="112" rx="30" ry="4.5" fill={`hsl(${h}, 60%, 15%)`} opacity="0.24" />
            
            {/* Drip tip */}
            <rect x="48" y="5" width="24" height="12" rx="4" fill={`url(#${darkId})`} />
            
            {/* Bubble Glass Sub-Ohm Tank */}
            <rect x="42" y="16" width="36" height="34" rx="8" fill={`url(#${glassId})`} opacity="0.92" />
            <rect x="49" y="22" width="22" height="22" rx="4" fill={`url(#${gradientId})`} opacity="0.65" />
            
            {/* Box Mod Heavy Chassis */}
            <rect x="30" y="46" width="60" height="64" rx="14" fill={`url(#${gradientId})`} />
            
            {/* OLED Display and Controls */}
            <rect x="38" y="56" width="26" height="16" rx="4" fill="#120E22" />
            <rect x="41" y="60" width="14" height="3" rx="1.5" fill={`hsl(${h}, 95%, 75%)`} />
            <circle cx="75" cy="64" r="6" fill="#fff" opacity="0.9" />
            <circle cx="75" cy="80" r="3" fill="#fff" opacity="0.6" />
            <circle cx="75" cy="90" r="3" fill="#fff" opacity="0.6" />
            
            <rect x="34" y="52" width="4" height="50" rx="2" fill="#fff" opacity="0.3" />
          </>
        );

      case 'accessories':
        if (product.id === 'display') {
          return (
            <>
              {/* Acrylic Display Stand */}
              <ellipse cx="60" cy="108" rx="42" ry="5" fill="#4B3F72" opacity="0.2" />
              <path
                d="M 22 96 L 30 36 L 90 36 L 98 96 Z"
                fill="none"
                stroke={`hsl(${h || 240}, 80%, 75%)`}
                strokeWidth="2.5"
                opacity="0.8"
              />
              <line x1="26" y1="52" x2="94" y2="52" stroke="#fff" strokeWidth="2.5" opacity="0.7" />
              <line x1="24" y1="72" x2="96" y2="72" stroke="#fff" strokeWidth="2.5" opacity="0.7" />
              <line x1="22" y1="92" x2="98" y2="92" stroke="#fff" strokeWidth="3" opacity="0.9" />
              <rect x="36" y="42" width="10" height="22" rx="2" fill="#5B3DF5" opacity="0.6" />
              <rect x="52" y="42" width="10" height="22" rx="2" fill="#E8336F" opacity="0.6" />
              <rect x="68" y="42" width="10" height="22" rx="2" fill="#0E9A72" opacity="0.6" />
            </>
          );
        }
        return (
          <>
            {/* Braided Cable loops */}
            <ellipse cx="60" cy="106" rx="36" ry="4" fill="#3B2F63" opacity="0.2" />
            <path
              d="M 20 86 C 36 20, 80 120, 100 36"
              stroke={`url(#${gradientId})`}
              strokeWidth="9"
              fill="none"
              strokeLinecap="round"
            />
            {/* USB-C Connector Heads */}
            <rect x="11" y="80" width="20" height="15" rx="5" fill={`url(#${darkId})`} />
            <rect x="91" y="24" width="20" height="15" rx="5" fill={`url(#${darkId})`} />
            <rect x="18" y="93" width="6" height="5" rx="1.5" fill="#A49EBF" />
            <rect x="98" y="37" width="6" height="5" rx="1.5" fill="#A49EBF" />
          </>
        );

      default:
        return null;
    }
  };

  return (
    <svg
      viewBox="0 0 120 120"
      className={`w-full h-full select-none transition-all duration-300 ${className}`}
      style={{
        background: `radial-gradient(60% 55% at 50% 55%, hsl(${h}, 95%, 72%, 0.35), transparent 75%), #FAF9F5`,
      }}
      role="img"
      aria-label={product.name}
    >
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={`hsl(${h}, 95%, 76%)`} />
          <stop offset="55%" stopColor={`hsl(${h}, 85%, 54%)`} />
          <stop offset="100%" stopColor={`hsl(${h}, 80%, 34%)`} />
        </linearGradient>
        <linearGradient id={darkId} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#3C3654" />
          <stop offset="50%" stopColor="#1E1933" />
          <stop offset="100%" stopColor="#3C3654" />
        </linearGradient>
        <linearGradient id={glassId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={`hsl(${h}, 40%, 94%)`} stopOpacity="0.9" />
          <stop offset="100%" stopColor={`hsl(${h}, 30%, 82%)`} stopOpacity="0.75" />
        </linearGradient>
      </defs>

      {renderCategoryArtwork()}
    </svg>
  );
};
