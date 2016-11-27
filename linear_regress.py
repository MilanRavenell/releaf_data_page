from sklearn import datasets, cluster, preprocessing, metrics
from matplotlib import pyplot as plt
from mpl_toolkits.mplot3d import Axes3D
import openpyxl
import pandas as pd
from sklearn.feature_extraction import DictVectorizer
import sys

def main(argv):
	data = pd.read_excel('uploads/' + argv[0])
	#data = pd.read_csv('http://www-bcf.usc.edu/~gareth/ISL/Advertising.csv', index_col=0)

	# create X and y
	X_col = argv[1]
	Y_col = argv[2]
	# feature_cols = ['Workforce']
	feature_cols = [X_col]
	X = data[feature_cols]
	y = data[Y_col]

	# follow the usual sklearn pattern: import, instantiate, fit
	from sklearn.linear_model import LinearRegression
	lm = LinearRegression()
	lm.fit(X, y)

	# print intercept and coefficients
	print lm.intercept_
	print lm.coef_

	# pair the feature names with the coefficients
	zip(feature_cols, lm.coef_)

	# predict for a new observation
	X_new = pd.DataFrame({'Workforce Size': [data[X_col].min(), data[X_col].max()]})
	preds = lm.predict(X_new)
	data.plot(kind='scatter', x=X_col, y=Y_col)
	plt.plot(X_new, preds, c='red', linewidth=2)
	# regres = plt.plot(X_new, preds, c='red', linewidth=2)
	# fig = regres.get_figure()
	plt.savefig('public/img/plot.png')
	#plt.show()

	# calculate the R-squared
	lm.score(X, y)

def plot():
	data = pd.read_csv('http://www-bcf.usc.edu/~gareth/ISL/Advertising.csv', index_col=0)
	fig, axs = plt.subplots(1, 3, sharey=True)
	data.plot(kind='scatter', x='TV', y='Sales', ax=axs[0], figsize=(16, 8))
	data.plot(kind='scatter', x='Radio', y='Sales', ax=axs[1])
	data.plot(kind='scatter', x='Newspaper', y='Sales', ax=axs[2])

#best_fit()
if __name__ == "__main__":
	main(sys.argv[1:])