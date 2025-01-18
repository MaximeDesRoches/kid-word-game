export default function randomArrayItem<T>(array:Array<T>):T {
	return array[Math.floor(Math.random() * array.length)];
}