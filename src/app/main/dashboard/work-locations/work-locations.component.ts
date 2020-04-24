import {Component, Injectable, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {SelectionModel} from '@angular/cdk/collections';
import {FlatTreeControl} from '@angular/cdk/tree';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';
import {BehaviorSubject} from 'rxjs';
import {fuseAnimations} from "../../../../@fuse/animations";
import {WorkLocationService} from "../../../shared/services/work-location.service";
import {SkillCreateComponent} from "../skills/skill-create/skill-create.component";
import {FormGroup} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {UpdateWorkLocationsComponent} from "./update-work-locations/update-work-locations.component";
import {AlertService} from "../../../shared/services/alert.service";

/**
 * Node for to-do item
 */
export class TodoItemNode {
    children: TodoItemNode[];
    item: string
}

/** Flat to-do item node with expandable and level information */
export class TodoItemFlatNode {
    item: string;
    level: number;
    expandable: boolean;
}

/**
 * Checklist database, it can build a tree structured Json object.
 * Each node in Json object represents a to-do item or a category.
 * If a node is a category, it has children items and new items can be added under the category.
 */
@Injectable()
export class ChecklistDatabase {
    dataChange = new BehaviorSubject<TodoItemNode[]>([]);
    countriesData: any = [];

    get data(): TodoItemNode[] {
        return this.dataChange.value;
    }

    constructor(private workLocationService: WorkLocationService) {
        this.initialize();
    }

    initialize() {
        // Build the tree nodes from Json object. The result is a list of `TodoItemNode` with nested
        //     file node as children.
        this.getWorkLocations();
    }

    getWorkLocations() {
        this.workLocationService.getWorkLocations({'page': -1}).subscribe(data => {
            if (data && data.items && data.items.length > 0) {
                this.countriesData = data.items;
                this.createTreeData(data);
            }
        });
    }

    createTreeData(data) {
        const countriesArr = data.items;
        let countries = {};
        if (countriesArr && countriesArr.length > 0) {
            countriesArr.forEach(country => {
                if (country) {
                    if (country['regions'] && country['regions'].length === 0) {
                        countries[country.name] = [];
                    } else if (country['regions'] && country['regions'].length > 0) {
                        const countryRegions = [];
                        country['regions'].forEach(region => {
                            if (region) {
                                countryRegions.push(region.name);
                            }
                        });
                        countries[country.name] = countryRegions;
                    }
                }
            });

            countriesArr.forEach(country => {
                countries[country.name] = [];
                if (country) {
                    if (country['regions'] && country['regions'].length > 0) {
                        country['regions'].forEach(region => {
                            if (region['states'] && region['states'].length === 0) {
                                countries[country.name][region.name] = [];
                            } else if (region['states'] && region['states'].length > 0) {
                                const regionStates = [];
                                region['states'].forEach(state => {
                                    if (state) {
                                        regionStates.push(state.name);
                                    }
                                });
                                countries[country.name][region.name] = regionStates;
                            }
                        });
                    }
                }
            });

            countriesArr.forEach(country => {
                countries[country.name] = [];
                if (country) {
                    if (country['regions'] && country['regions'].length > 0) {
                        country['regions'].forEach(region => {
                            countries[country.name][region.name] = [];
                            if (region['states'] && region['states'].length > 0) {
                                region['states'].forEach(state => {
                                    if (state && state['lgas'] && state['lgas'].length === 0) {
                                        countries[country.name][region.name][state.name] = [];
                                    } else if (state['lgas'] && state['lgas'].length > 0) {
                                        const stateLgas = [];
                                        state['lgas'].forEach(lga => {
                                            if (lga) {
                                                stateLgas.push(lga.name);
                                            }
                                        });
                                        countries[country.name][region.name][state.name] = stateLgas;
                                    }
                                });
                            }
                        });
                    }
                }
            });
        }
        const treeData = this.buildFileTree({Countries: countries}, 0);
        // Notify the change.
        this.dataChange.next(treeData);
    }

    /**
     * Build the file structure tree. The `value` is the Json object, or a sub-tree of a Json object.
     * The return value is the list of `TodoItemNode`.
     */
    buildFileTree(obj: { [key: string]: any }, level: number): TodoItemNode[] {
        return Object.keys(obj).reduce<TodoItemNode[]>((accumulator, key) => {
            const value = obj[key];
            const node = new TodoItemNode();
            node.item = key;
            if (value !== null) {
                if (typeof value === 'object') {
                    node.children = this.buildFileTree(value, level + 1);
                } else {
                    node.item = value;
                }
            }
            return accumulator.concat(node);
        }, []);
    }

    /** Add an item to to-do list */
    insertItem(parent: TodoItemNode, name: string) {
        if (parent.children) {
            parent.children.push({item: name} as TodoItemNode);
            this.dataChange.next(this.data);
        }
    }

    updateItem(node: TodoItemNode, name: string) {
        node.item = name;
        this.dataChange.next(this.data);
    }
}

@Component({
    selector: 'app-work-locations',
    templateUrl: './work-locations.component.html',
    styleUrls: ['./work-locations.component.scss'],
    providers: [ChecklistDatabase],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class WorkLocationsComponent implements OnInit {
    /** Map from flat node to nested node. This helps us finding the nested node to be modified */
    flatNodeMap = new Map<TodoItemFlatNode, TodoItemNode>();

    /** Map from nested node to flattened node. This helps us to keep the same object for selection */
    nestedNodeMap = new Map<TodoItemNode, TodoItemFlatNode>();

    /** A selected parent node to be inserted */
    selectedParent: TodoItemFlatNode | null = null;

    /** The new item's name */
    newItemName = '';

    treeControl: FlatTreeControl<TodoItemFlatNode>;

    treeFlattener: MatTreeFlattener<TodoItemNode, TodoItemFlatNode>;

    dataSource: MatTreeFlatDataSource<TodoItemNode, TodoItemFlatNode>;

    /** The selection for checklist */
    checklistSelection = new SelectionModel<TodoItemFlatNode>(true);

    activeNode: any;
    updationType: any;

    constructor(private _database: ChecklistDatabase, private workLocationService: WorkLocationService, private _matDialog: MatDialog, private alertService: AlertService) {
        this.treeFlattener = new MatTreeFlattener(this.transformer, this.getLevel,
            this.isExpandable, this.getChildren);
        this.treeControl = new FlatTreeControl<TodoItemFlatNode>(this.getLevel, this.isExpandable);
        this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

        _database.dataChange.subscribe(data => {
            this.dataSource.data = data;
        });
    }

    getLevel = (node: TodoItemFlatNode) => node.level;

    isExpandable = (node: TodoItemFlatNode) => node.expandable;

    getChildren = (node: TodoItemNode): TodoItemNode[] => node.children;

    hasChild = (_: number, _nodeData: TodoItemFlatNode) => _nodeData.expandable;

    hasNoContent = (_: number, _nodeData: TodoItemFlatNode) => _nodeData.item === '';

    selectedId: any;
    dialogRef: any;

    // @ViewChild(UpdateWorkLocationsComponent) updateSkill: UpdateWorkLocationsComponent;

    ngOnInit(): void {
    }

    /**
     * Transformer to convert nested node to flat node. Record the nodes in maps for later use.
     */
    transformer = (node: TodoItemNode, level: number) => {
        const existingNode = this.nestedNodeMap.get(node);
        const flatNode = existingNode && existingNode.item === node.item ? existingNode : new TodoItemFlatNode();
        flatNode.item = node.item;
        flatNode.level = level;
        flatNode.expandable = !!node.children;
        this.flatNodeMap.set(flatNode, node);
        this.nestedNodeMap.set(node, flatNode);
        return flatNode;
    }

    /** Whether all the descendants of the node are selected. */
    descendantsAllSelected(node: TodoItemFlatNode): boolean {
        const descendants = this.treeControl.getDescendants(node);
        return descendants.every(child =>
            this.checklistSelection.isSelected(child)
        );
    }

    /** Whether part of the descendants are selected */
    descendantsPartiallySelected(node: TodoItemFlatNode): boolean {
        const descendants = this.treeControl.getDescendants(node);
        const result = descendants.some(child => this.checklistSelection.isSelected(child));
        return result && !this.descendantsAllSelected(node);
    }

    /** Toggle the to-do item selection. Select/deselect all the descendants node */
    todoItemSelectionToggle(node: TodoItemFlatNode): void {
        this.checklistSelection.toggle(node);
        const descendants = this.treeControl.getDescendants(node);
        this.checklistSelection.isSelected(node)
            ? this.checklistSelection.select(...descendants)
            : this.checklistSelection.deselect(...descendants);

        // Force update for the parent
        descendants.every(child =>
            this.checklistSelection.isSelected(child)
        );
        this.checkAllParentsSelection(node);
    }

    /** Toggle a leaf to-do item selection. Check all the parents to see if they changed */
    todoLeafItemSelectionToggle(node: TodoItemFlatNode): void {
        this.checklistSelection.toggle(node);
        this.checkAllParentsSelection(node);
    }

    /* Checks all the parents when a leaf node is selected/unselected */
    checkAllParentsSelection(node: TodoItemFlatNode): void {
        let parent: TodoItemFlatNode | null = this.getParentNode(node);
        while (parent) {
            this.checkRootNodeSelection(parent);
            parent = this.getParentNode(parent);
        }
    }

    /** Check root node checked state and change it accordingly */
    checkRootNodeSelection(node: TodoItemFlatNode): void {
        const nodeSelected = this.checklistSelection.isSelected(node);
        const descendants = this.treeControl.getDescendants(node);
        const descAllSelected = descendants.every(child =>
            this.checklistSelection.isSelected(child)
        );
        if (nodeSelected && !descAllSelected) {
            this.checklistSelection.deselect(node);
        } else if (!nodeSelected && descAllSelected) {
            this.checklistSelection.select(node);
        }
    }

    /* Get the parent node of a node */
    getParentNode(node: TodoItemFlatNode): TodoItemFlatNode | null {
        const currentLevel = this.getLevel(node);

        if (currentLevel < 1) {
            return null;
        }

        const startIndex = this.treeControl.dataNodes.indexOf(node) - 1;

        for (let i = startIndex; i >= 0; i--) {
            const currentNode = this.treeControl.dataNodes[i];

            if (this.getLevel(currentNode) < currentLevel) {
                return currentNode;
            }
        }
        return null;
    }

    /** Select the category so we can insert the new item. */
    addNewItem(node: TodoItemFlatNode) {
        this.activeNode = node;
        if (this.activeNode.level === 1) {
            if (this._database.countriesData && this._database.countriesData.length > 0) {
                this._database.countriesData.forEach(country => {
                    if (country.name === this.activeNode.item) {
                        this.selectedId = country.id
                    }
                })
            }
        } else if (this.activeNode.level === 2) {
            if (this._database.countriesData && this._database.countriesData.length > 0) {
                this._database.countriesData.forEach(country => {
                    if (country && country['regions']) {
                        country['regions'].forEach(region => {
                            if (region.name === this.activeNode.item) {
                                this.selectedId = region.id
                            }
                        });
                    }
                })
            }
        } else if (this.activeNode.level === 3) {
            if (this._database.countriesData && this._database.countriesData.length > 0) {
                this._database.countriesData.forEach(country => {
                    if (country && country['regions']) {
                        country['regions'].forEach(region => {
                            if (region && region['states'] && region['states'].length > 0) {
                                region['states'].forEach(state => {
                                    if (state.name === this.activeNode.item) {
                                        this.selectedId = state.id
                                    }
                                });
                            }
                        });
                    }
                })
            }
        }
        const parentNode = this.flatNodeMap.get(node);
        this._database.insertItem(parentNode!, '');
        this.treeControl.expand(node);
    }

    deleteItem(node: TodoItemFlatNode) {
        this.activeNode = node;
        if (this.activeNode.level === 1) {
            if (this._database.countriesData && this._database.countriesData.length > 0) {
                this._database.countriesData.forEach(country => {
                    if (country.name === this.activeNode.item) {
                        this.selectedId = country.id
                    }
                });
                this.deleteCountry();
            }
        } else if (this.activeNode.level === 2) {
            if (this._database.countriesData && this._database.countriesData.length > 0) {
                this._database.countriesData.forEach(country => {
                    if (country && country['regions']) {
                        country['regions'].forEach(region => {
                            if (region.name === this.activeNode.item) {
                                this.selectedId = region.id
                            }
                        });
                    }
                });
                this.deleteRegion();
            }
        } else if (this.activeNode.level === 3) {
            if (this._database.countriesData && this._database.countriesData.length > 0) {
                this._database.countriesData.forEach(country => {
                    if (country && country['regions']) {
                        country['regions'].forEach(region => {
                            if (region && region['states'] && region['states'].length > 0) {
                                region['states'].forEach(state => {
                                    if (state.name === this.activeNode.item) {
                                        this.selectedId = state.id
                                    }
                                });
                            }
                        });
                    }
                });
                this.deleteState();
            }
        } else if (this.activeNode.level === 4) {
            if (this._database.countriesData && this._database.countriesData.length > 0) {
                this._database.countriesData.forEach(country => {
                    if (country && country['regions']) {
                        country['regions'].forEach(region => {
                            if (region && region['states'] && region['states'].length > 0) {
                                region['states'].forEach(state => {
                                    if (state && state['lgas'] && state['lgas'].length > 0) {
                                        state['lgas'].forEach(lga => {
                                            if (lga.name === this.activeNode.item) {
                                                this.selectedId = lga.id
                                            }
                                        });
                                    }
                                });
                            }
                        });
                    }
                });
                this.deleteLga();
            }
        }
    }

    editItem(node: TodoItemFlatNode) {
        this.activeNode = node;
        if (this.activeNode.level === 0) {
            this.alertService.showErrors('Base Level Can\'t be changed');
            return;
        }
        if (this.activeNode.level === 1) {
            if (this._database.countriesData && this._database.countriesData.length > 0) {
                this._database.countriesData.forEach(country => {
                    if (country.name === this.activeNode.item) {
                        this.updationType = 'COUNTRY';
                        this.selectedId = country.id
                    }
                })
            }
        } else if (this.activeNode.level === 2) {
            if (this._database.countriesData && this._database.countriesData.length > 0) {
                this._database.countriesData.forEach(country => {
                    if (country && country['regions']) {
                        country['regions'].forEach(region => {
                            if (region.name === this.activeNode.item) {
                                this.updationType = 'REGION';
                                this.selectedId = region.id
                            }
                        });
                    }
                })
            }
        } else if (this.activeNode.level === 3) {
            if (this._database.countriesData && this._database.countriesData.length > 0) {
                this._database.countriesData.forEach(country => {
                    if (country && country['regions']) {
                        country['regions'].forEach(region => {
                            if (region && region['states'] && region['states'].length > 0) {
                                region['states'].forEach(state => {
                                    if (state.name === this.activeNode.item) {
                                        this.updationType = 'STATE';
                                        this.selectedId = state.id
                                    }
                                });
                            }
                        });
                    }
                })
            }
        } else if (this.activeNode.level === 4) {
            if (this._database.countriesData && this._database.countriesData.length > 0) {
                this._database.countriesData.forEach(country => {
                    if (country && country['regions']) {
                        country['regions'].forEach(region => {
                            if (region && region['states'] && region['states'].length > 0) {
                                region['states'].forEach(state => {
                                    if (state && state['lgas'] && state['lgas'].length > 0) {
                                        state['lgas'].forEach(lga => {
                                            if (lga.name === this.activeNode.item) {
                                                this.updationType = 'LGA';
                                                this.selectedId = lga.id
                                            }
                                        });
                                    }
                                });
                            }
                        });
                    }
                });
            }
        }

        this.dialogRef = this._matDialog.open(UpdateWorkLocationsComponent, {
            panelClass: 'contact-form-dialog',
            data: {action: 'EDIT', node: node, selectedId: this.selectedId, updationType: this.updationType}
        });
        this.dialogRef.afterClosed().subscribe((response: FormGroup) => {
            this.updationType = undefined;
            this.selectedId = undefined;
            if (!response) {
                return;
            }
            this._database.initialize();
        });
    }

    deleteCountry() {
        this.workLocationService.deleteCountry(this.selectedId).subscribe(data => {
            if (data) {
                this._database.initialize();
            }
        })
    }

    deleteRegion() {
        this.workLocationService.deleteRegion(this.selectedId).subscribe(data => {
            if (data) {
                this._database.initialize();
            }
        })
    }

    deleteState() {
        this.workLocationService.deleteState(this.selectedId).subscribe(data => {
            if (data) {
                this._database.initialize();
            }
        })
    }

    deleteLga() {
        this.workLocationService.deleteLga(this.selectedId).subscribe(data => {
            if (data) {
                this._database.initialize();
            }
        })
    }

    /** Save the node to database */
    saveNode(node: TodoItemFlatNode, itemValue: string) {
        if (this.activeNode.level === 0) {
            this.workLocationService.addCountry({'name': itemValue}).subscribe(data => {
                this._database.initialize();
            });
        } else if (this.activeNode.level === 1) {
            this.workLocationService.addRegion({'name': itemValue, 'countryId': this.selectedId}).subscribe(data => {
                this._database.initialize();
            });
        } else if (this.activeNode.level === 2) {
            this.workLocationService.addState({'name': itemValue, 'regionId': this.selectedId}).subscribe(data => {
                this._database.initialize();
            });
        } else if (this.activeNode.level === 3) {
            this.workLocationService.addLga({'name': itemValue, 'stateId': this.selectedId}).subscribe(data => {
                this._database.initialize();
            });
        }
    }
}