const Titulo = "Core"
export let CorrentTitle = Titulo
export default function setTitle(title: string, ...args:any[]) {
    const argsString = args.join(' - ');
    CorrentTitle = `${Titulo} - ${title || "Desconhecido"}${argsString ? ' - ' + argsString : ''}`;
}