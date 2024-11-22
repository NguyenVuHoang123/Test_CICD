export const formatPhoneNumber = (phoneStr: string) => {
    const first3 = phoneStr.slice(0, 3);
    const last3 = phoneStr.slice(-2);
    const middleStars = '*'.repeat(phoneStr.length - 5);
    return `${first3}${middleStars}${last3}`;
}