export const useUid = () => {
	return Math.random().toString(36).substring(2, 16);
};
