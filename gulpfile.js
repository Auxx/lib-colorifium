const gulp = require('gulp');
const bump = require('gulp-bump');
const git = require('gulp-git');
const runSequence = require('run-sequence');
const run = require('gulp-run');
const del = require('del');
const ts = require("gulp-typescript");

gulp.task('package:clean', () => {
  del.sync('./dist/**/*');
});

gulp.task('package:build', () => {
  const project = ts.createProject('tsconfig.json');
  return project
    .src()
    .pipe(project())
    .js.pipe(gulp.dest(('./dist/out')));
});

gulp.task('package:buildDefs', () => {
  const project = ts.createProject('tsconfig.json');
  return project
    .src()
    .pipe(project())
    .dts.pipe(gulp.dest('./dist/out'));
});

gulp.task('package:prepare', () => {
  return gulp
    .src('./dist/out/main/**/*')
    .pipe(gulp.dest('./dist/package'));
});

gulp.task('package:overlay', () => {
  return gulp
    .src('./package/**')
    .pipe(gulp.dest('./dist/package'));
});

/*
 * Version bumping
 */

/**
 * Bumps major version number
 */
gulp.task('release:bumpMajor', () => {
  return gulp.src('./package/package.json')
    .pipe(bump({ type: 'major' }))
    .pipe(gulp.dest('./package/'));
});

/**
 * Bumps minor version number, this is a default action
 */
gulp.task('release:bump', () => {
  return gulp.src('./package/package.json')
    .pipe(bump({ type: 'minor' }))
    .pipe(gulp.dest('./package/'));
});

/**
 * Bumps patch version number
 */
gulp.task('release:bumpPatch', () => {
  return gulp.src('./package/package.json')
    .pipe(bump({ type: 'minor' }))
    .pipe(gulp.dest('./package/'));
});

/*
 * Git operations
 */

gulp.task('release:tag', () => {
  const version = require(__dirname + '/package/package.json').version;

  return gulp.src('./package/package.json')
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
