function skillsMember() {
    return {
        restrict: 'E',
        templateUrl: 'partials/member/skills.html',
        controller: 'SkillsController',
        controllerAs: 'vm',
        bindToController: true,
        scope: {
            member: '='
        }
    };
}