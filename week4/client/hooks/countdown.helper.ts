type CountDownType = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

export const countdownHelper = (deadline: Date | undefined): CountDownType | null => {
  if (!deadline) return null;
  const countdownObjet = {} as CountDownType;
  const time = new Date(deadline).getTime() - Date.now();

  setInterval(() => {
    countdownObjet.days = Math.floor(time / (1000 * 60 * 60 * 24));
    countdownObjet.hours = Math.floor((time / (1000 * 60 * 60)) % 24);
    countdownObjet.minutes = Math.floor((time / 1000 / 60) % 60);
    countdownObjet.seconds = Math.floor((time / 1000) % 60);
  }, 1000);

  return countdownObjet;
};
