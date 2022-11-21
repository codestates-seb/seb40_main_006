// eslint-disable-next-line consistent-return
export default function jamElapsedTime(date) {
  const start = new Date(date);
  const end = new Date();
  const diff = end - start;

  const times = [
    { time: '년', milliSeconds: 1000 * 60 * 60 * 24 * 365 },
    { time: '개월', milliSeconds: 1000 * 60 * 60 * 24 * 30 },
    { time: '일', milliSeconds: 1000 * 60 * 60 * 24 },
    { time: '시간', milliSeconds: 1000 * 60 * 60 },
    { time: '분', milliSeconds: 1000 * 60 },
    { time: '초', milliSeconds: 1000 },
  ];

  // eslint-disable-next-line no-restricted-syntax, no-unreachable-loop
  for (const value of times) {
    const betweenTime = Math.floor(diff / value.milliSeconds);
    if (betweenTime > 0) {
      return `${betweenTime}${value.time}전`;
    }
  }
  return '방금전';
}
