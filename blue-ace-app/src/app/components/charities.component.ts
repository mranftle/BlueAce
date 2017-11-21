import {Component, OnInit, ViewChild } from '@angular/core'
import { Router } from "@angular/router";
@Component({
  selector:'charities',
  templateUrl: '../templates/charities.component.html',
  styleUrls:['../stylesheets/charities.component.css'],
})

export class CharitiesComponent {
  public charity_arr: [{name: "Boys and Girls Club of America", description: 'Formed in 1906, Boys & Girls Clubs of America (BGCA) is a national organization of local chapters which provide after-school programs for young people. Boys & Girls Clubs annually serve nearly 4 million young people, through membership and community outreach, in some 4,100 Club facilities throughout the country and BGCA-affiliated Youth Centers on U.S. military installations worldwide. The mission is to enable all young people, especially those who need us most, to reach their full potential as productive, caring, responsible citizens, by providing a world-class Club Experience that assures success is within reach of every young person who enters our doors, with all members on track to graduate from high school with a plan for the future, demonstrating good character and citizenship, and living a healthy lifestyle.', url:'https://www.charitynavigator.org/index.cfm?bay=search.summary&orgid=3380'}]

  constructor(private router: Router) {}
  goHome(){
    this.router.navigateByUrl('/main');
  }

}
