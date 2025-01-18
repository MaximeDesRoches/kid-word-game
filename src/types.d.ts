interface IDefaultListItem {
	id: number,
}

interface IFooListItem extends IDefaultListItem {
	code: string,
	name: string,
	group: string,
}

interface IFooItem extends IFooListItem {
	description: string,
}
