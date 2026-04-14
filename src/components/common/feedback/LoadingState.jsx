import React from 'react';
import Lottie from 'lottie-react';
import loadingAnimation from '../../../assets/lotiefiles/Loading animation blue.json';
import StatusMessage from './StatusMessage';

export default function LoadingState({
  message = 'جاري التحميل...',
  className = '',
  size = 'w-32',
}) {
  return (
    <div className={['flex flex-col items-center justify-center gap-3', className].filter(Boolean).join(' ')}>
      <Lottie animationData={loadingAnimation} className={size} loop />
      <StatusMessage message={message} tone="info" className="p-0" />
    </div>
  );
}
