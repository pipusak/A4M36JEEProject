module AosWebApp{
    export abstract class GeneralList{
        protected tableContainer: HTMLDivElement;

        protected createInputCell(value: string, id: string): HTMLTableDataCellElement{
            let td = document.createElement('td');
            let input = document.createElement("input");
            input.value = value;
            input.id = id;
            td.appendChild(input);
            return td;
        }

        protected createSelectCell(options: Array<HTMLOptionElement>, selected: number, id: string): HTMLTableDataCellElement{
            let td = document.createElement('td');
            let selectElement = document.createElement('select');
            selectElement.id = id;

            for(let i=0; i< options.length; i++){
                selectElement.appendChild(options[i]);
            }//for

            selectElement.selectedIndex = selected;
            td.appendChild(selectElement);
            return td;
        }

        protected createSaveButton(id: string, callback:(evt: Event) => any): HTMLButtonElement{
            //let tableCell = document.createElement('td');
            let button = document.createElement("button");
            button.id = id;
            button.title = "Save";
            button.textContent = "Save";
            button.addEventListener("click",callback,false);
            return button;
            //tableCell.appendChild(button);
            //return tableCell;
        }

        protected createDeleteButton(id: string, callback:(evt: Event) => any): HTMLButtonElement{
            let button = document.createElement("button");
            button.id = id;
            button.title = "Delete";
            button.textContent = "Delete";
            button.addEventListener("click",callback,false);
            return button;    
        }

        public clearList(){
            while (this.tableContainer.firstChild) {
                this.tableContainer.removeChild(this.tableContainer.firstChild);
            }
        }

        protected createTable(): HTMLTableElement{
            let tbl = document.createElement('table');
            tbl.style.width = '100%';
            tbl.setAttribute('border', '1');
            return tbl;
        }
    }
}