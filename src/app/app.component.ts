import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PreludeModule } from './modules/prelude/prelude.module';
import { EditorModule } from './modules/editor/editor.module';
import { Workspace } from './workspace/workspace';
import { Directory } from './workspace/directory';
import { SharedModule } from './modules/shared/shared.module';

/**
 * Provides scaffolding to the application.
 */
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, PreludeModule, EditorModule, SharedModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'infantry-editor';
  state: 'Prelude' | 'Editor' = 'Prelude';
  workspace: Workspace = new Workspace();

  onDirectorySelected($event: Directory) {
    this.workspace.directory$.next($event);
    this.state = 'Editor';
  }

  get isPrelude(): boolean {
    return this.state === 'Prelude';
  }

  get isEditor(): boolean {
    return this.state === 'Editor';
  }
}
