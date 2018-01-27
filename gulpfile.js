const gulp = require('gulp');
const bump = require('gulp-bump');
const git = require('gulp-git');
const runSequence = require('run-sequence');

/*
 * Version bumping
 */

/**
 * Bumps major version number
 */
gulp.task('release:bumpMajor', () => {
  return gulp.src('./package.json')
    .pipe(bump({ type: 'major' }))
    .pipe(gulp.dest('./'));
});

/**
 * Bumps minor version number, this is a default action
 */
gulp.task('release:bump', () => {
  return gulp.src('./package.json')
    .pipe(bump({ type: 'minor' }))
    .pipe(gulp.dest('./'));
});

/**
 * Bumps patch version number
 */
gulp.task('release:bumpPatch', () => {
  return gulp.src('./package.json')
    .pipe(bump({ type: 'minor' }))
    .pipe(gulp.dest('./'));
});

/*
 * Git operations
 */

gulp.task('release:tag', () => {
  const version = require(__dirname + '/package.json').version;

  return gulp.src('./package.json')
    .pipe(git.add())
    .pipe(git.commit(`Preparing new release ${version}`))
    .pipe(git.tag(version), `Version ${version}`)
});

gulp.task('release:switchToMaster', done => {
  return git.checkout('master', done);
});

gulp.task('release:push', done => {
  git.push('origin', 'master', { args: " --tags" }, done);
});

/*
 * Release aggregations
 */

/**
 * Creates a new release with minor version number bump.
 * This is a default release action.
 */
gulp.task('release', done => runSequence('release:switchToMaster', 'release:bump', 'release:tag', 'release:push', done));

/**
 * Creates a new release with major version number bump.
 */
gulp.task('releaseMajor', done => runSequence('release:switchToMaster', 'release:bumpMajor', 'release:tag', 'release:push', done));

/**
 * Creates a new release with patch version number bump.
 */
gulp.task('releasePatch', done => runSequence('release:switchToMaster', 'release:bumpPatch', 'release:tag', 'release:push', done));
